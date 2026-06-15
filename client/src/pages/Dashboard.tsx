/// <reference types="@types/google.maps" />

import { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@/components/Layout";
import { MapView } from "@/components/Map";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
// ---- Types ----

interface DailyEntry {
  id: string;
  date: string;
  daysAlive: number;
  steps?: number;
  sleepHours?: number;
  heartRate?: number;
  mood: number;
  energy: number;
  focus: number;
  journalText?: string;
  location?: { lat: number; lng: number; city?: string };
  weather?: { temp: number; condition: string; humidity?: number };
  createdAt: string;
  updatedAt: string;
}

interface FormState {
  steps: string;
  sleepHours: string;
  heartRate: string;
  mood: number;
  energy: number;
  focus: number;
  journalText: string;
}

// ---- Helpers ----

function weatherCodeToText(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 55) return "Drizzle";
  if (code <= 65) return "Rain";
  if (code <= 75) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 99) return "Thunderstorm";
  return "Unknown";
}

const DEFAULT_FORM: FormState = {
  steps: "",
  sleepHours: "",
  heartRate: "",
  mood: 5,
  energy: 5,
  focus: 5,
  journalText: "",
};

async function apiSaveEntry(
  body: Omit<DailyEntry, "id" | "createdAt" | "updatedAt">,
): Promise<DailyEntry> {
  const res = await fetch("/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Save failed");
  return res.json();
}

async function apiFetchEntries(): Promise<DailyEntry[]> {
  const res = await fetch("/api/entries");
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

async function apiDeleteEntry(date: string): Promise<void> {
  await fetch(`/api/entries/${date}`, { method: "DELETE" });
}

// ---- Main Component ----

export default function Dashboard() {
  useDocumentTitle("Dashboard");
  const today = new Date().toISOString().split("T")[0];

  // DOB stored in localStorage — drives the days-alive counter
  const [dob, setDob] = useState<string>(() => localStorage.getItem("life_dob") || "");
  const [dobInput, setDobInput] = useState(dob);
  const [showDobPanel, setShowDobPanel] = useState(false);

  const daysAlive =
    dob
      ? Math.floor((Date.now() - new Date(dob + "T00:00:00").getTime()) / 86_400_000)
      : null;

  // Entry state
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<DailyEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Form state
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Location & weather
  const [location, setLocation] = useState<DailyEntry["location"]>(undefined);
  const [weather, setWeather] = useState<DailyEntry["weather"]>(undefined);
  const [locationLoading, setLocationLoading] = useState(false);

  // Voice recording
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<unknown>(null);

  // Map
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersAddedRef = useRef(false);

  // ---- Load entries on mount ----
  useEffect(() => {
    apiFetchEntries()
      .then((data) => {
        setEntries(data);
        const found = data.find((e) => e.date === today) ?? null;
        setTodayEntry(found);
        if (found) {
          setForm({
            steps: found.steps?.toString() ?? "",
            sleepHours: found.sleepHours?.toString() ?? "",
            heartRate: found.heartRate?.toString() ?? "",
            mood: found.mood,
            energy: found.energy,
            focus: found.focus,
            journalText: found.journalText ?? "",
          });
          if (found.location) setLocation(found.location);
          if (found.weather) setWeather(found.weather);
        }
      })
      .catch(() => toast.error("Could not load entries — is the server running?"))
      .finally(() => setLoading(false));
  }, [today]);

  // ---- Add map markers when entries + map are ready ----
  useEffect(() => {
    if (!mapRef.current || markersAddedRef.current) return;
    const locatedEntries = entries.filter((e) => e.location);
    if (!locatedEntries.length) return;
    markersAddedRef.current = true;
    locatedEntries.forEach((e) => {
      try {
        new window.google!.maps.marker.AdvancedMarkerElement({
          map: mapRef.current!,
          position: { lat: e.location!.lat, lng: e.location!.lng },
          title: e.date,
        });
      } catch {
        // Maps API not loaded — graceful no-op
      }
    });
  }, [entries, mapRef.current]);

  // ---- Fetch location & weather ----
  const fetchLocationWeather = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported in this browser");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lng } }) => {
        let city: string | undefined;

        try {
          const geo = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { "Accept-Language": "en-US" } },
          );
          const geoData = await geo.json();
          const a = geoData.address ?? {};
          city = a.city ?? a.town ?? a.village ?? a.county ?? undefined;
        } catch {
          // ignore
        }

        setLocation({ lat, lng, city });

        try {
          const wRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
              `&current=temperature_2m,relative_humidity_2m,weather_code&temperature_unit=fahrenheit`,
          );
          const wData = await wRes.json();
          const c = wData.current;
          setWeather({
            temp: Math.round(c.temperature_2m),
            condition: weatherCodeToText(c.weather_code),
            humidity: c.relative_humidity_2m,
          });
        } catch {
          // ignore
        }

        setLocationLoading(false);
      },
      () => {
        toast.error("Location access denied");
        setLocationLoading(false);
      },
    );
  }, []);

  // ---- Voice journal ----
  const startRecording = useCallback(() => {
    const SR =
      (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SR) {
      toast.error("Voice not supported — try Chrome or Safari");
      return;
    }
    const recognition = new (SR as new () => {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      start: () => void;
      stop: () => void;
      onresult: ((e: unknown) => void) | null;
      onend: (() => void) | null;
    })();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    const base = form.journalText;

    recognition.onresult = (e: unknown) => {
      const event = e as { resultIndex: number; results: SpeechRecognitionResultList };
      let final = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) final += event.results[i][0].transcript;
        else interim += event.results[i][0].transcript;
      }
      const combined = (base + (base && final ? " " : "") + final + (interim ? ` [${interim}]` : "")).trim();
      setField("journalText", combined);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
    setIsRecording(true);
  }, [form.journalText]);

  const stopRecording = useCallback(() => {
    (recognitionRef.current as { stop: () => void } | null)?.stop();
    setIsRecording(false);
    setField("journalText", form.journalText.replace(/\s*\[.*?\]/g, "").trim());
  }, [form.journalText]);

  // ---- Save entry ----
  const handleSave = useCallback(async () => {
    if (!dob) {
      toast.error("Set your date of birth first");
      setShowDobPanel(true);
      return;
    }
    setSaving(true);
    try {
      const saved = await apiSaveEntry({
        date: today,
        daysAlive: daysAlive!,
        steps: form.steps ? Number(form.steps) : undefined,
        sleepHours: form.sleepHours ? Number(form.sleepHours) : undefined,
        heartRate: form.heartRate ? Number(form.heartRate) : undefined,
        mood: form.mood,
        energy: form.energy,
        focus: form.focus,
        journalText: form.journalText || undefined,
        location: location ?? undefined,
        weather: weather ?? undefined,
      });
      setTodayEntry(saved);
      setEntries((prev) => [saved, ...prev.filter((e) => e.date !== today)]);
      setEditMode(false);
      toast.success("Entry saved");
    } catch {
      toast.error("Failed to save entry");
    } finally {
      setSaving(false);
    }
  }, [dob, today, daysAlive, form, location, weather]);

  // ---- Delete today's entry ----
  const handleDelete = useCallback(async () => {
    if (!todayEntry) return;
    await apiDeleteEntry(today);
    setTodayEntry(null);
    setEntries((prev) => prev.filter((e) => e.date !== today));
    setForm(DEFAULT_FORM);
    setLocation(undefined);
    setWeather(undefined);
    toast.success("Entry deleted");
  }, [todayEntry, today]);

  // ---- Chart data (last 30 entries, oldest first) ----
  const chartData = entries
    .slice(0, 30)
    .reverse()
    .map((e) => ({ date: e.date.slice(5), mood: e.mood, energy: e.energy, focus: e.focus }));

  const showForm = !todayEntry || editMode;
  const firstLocation = entries.find((e) => e.location)?.location;

  // ---- Render ----
  return (
    <Layout>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <span className="section-label section-label-red">// LIFE.LOG</span>
        <p
          style={{
            color: "var(--kc-accent)",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.85rem",
            marginTop: "8px",
          }}
        >
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="bento-grid">
        {/* Days Alive — terminal card */}
        <div
          className="bento-card terminal-card"
          style={{ flex: "0 1 320px", cursor: "pointer", minHeight: "180px" }}
          onClick={() => setShowDobPanel((v) => !v)}
          title="Click to set date of birth"
        >
          <div
            className="terminal-inner"
            style={{ flexDirection: "column", alignItems: "flex-start", gap: "10px" }}
          >
            <span style={{ fontSize: "0.72rem", opacity: 0.55, letterSpacing: "0.12em" }}>
              // DAYS ALIVE
            </span>
            <span
              style={{
                fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-2px",
              }}
            >
              {daysAlive !== null ? daysAlive.toLocaleString() : "???"}
            </span>
            {dob ? (
              <span style={{ fontSize: "0.78rem", opacity: 0.55 }}>
                since{" "}
                {new Date(dob + "T00:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            ) : (
              <span style={{ fontSize: "0.78rem", opacity: 0.55 }}>click to set birthday</span>
            )}
          </div>
        </div>

        {/* DOB panel */}
        {showDobPanel && (
          <div className="bento-card" style={{ flex: "0 1 280px", alignSelf: "center" }}>
            <span className="section-label">Date of Birth</span>
            <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
              <input
                type="date"
                value={dobInput}
                onChange={(e) => setDobInput(e.target.value)}
                className="kc-input"
                style={{ flex: 1 }}
              />
              <button
                className="btn-kc btn-kc-primary"
                style={{ padding: "12px 16px", whiteSpace: "nowrap" }}
                onClick={() => {
                  localStorage.setItem("life_dob", dobInput);
                  setDob(dobInput);
                  setShowDobPanel(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Today's Log */}
        <div className="bento-card bento-card-wide">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span className="section-label">
              {todayEntry && !editMode ? "// TODAY'S LOG" : "// LOG TODAY"}
            </span>
            {todayEntry && !editMode && (
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="btn-kc btn-kc-outline"
                  style={{ padding: "6px 14px", fontSize: "0.82rem" }}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
                <button
                  className="btn-kc"
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.82rem",
                    background: "transparent",
                    border: "1px solid #ddd",
                    color: "#999",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div
              style={{
                color: "var(--kc-accent)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.9rem",
              }}
            >
              Loading...
            </div>
          ) : showForm ? (
            <FormView
              form={form}
              setField={setField}
              location={location}
              weather={weather}
              locationLoading={locationLoading}
              fetchLocationWeather={fetchLocationWeather}
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
              saving={saving}
              editMode={editMode}
              onSave={handleSave}
              onCancelEdit={() => setEditMode(false)}
            />
          ) : (
            <EntryView entry={todayEntry!} />
          )}
        </div>

        {/* Trends chart */}
        {chartData.length > 1 && (
          <div className="bento-card bento-card-wide">
            <span className="section-label">// TRENDS (last {chartData.length} days)</span>
            <div style={{ marginTop: "20px" }}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
                  />
                  <YAxis domain={[1, 10]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.82rem",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#c8102e"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="focus"
                    stroke="#800020"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Location history map */}
        {firstLocation && (
          <div className="bento-card bento-card-wide">
            <span className="section-label">// LOCATION HISTORY</span>
            <div style={{ marginTop: "16px" }}>
              <MapView
                initialCenter={firstLocation}
                initialZoom={10}
                onMapReady={(map) => {
                  mapRef.current = map;
                }}
              />
            </div>
          </div>
        )}

        {/* History table */}
        {entries.length > 0 && (
          <div className="bento-card bento-card-wide">
            <span className="section-label">// HISTORY</span>
            <div style={{ marginTop: "16px", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--kc-border)" }}>
                    {["Date", "Days Alive", "Mood", "Energy", "Focus", "Steps", "Sleep", "Location"].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "8px 12px",
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: "0.75rem",
                            color: "var(--kc-accent)",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {entries.slice(0, 30).map((e) => (
                    <tr key={e.id} style={{ borderBottom: "1px solid var(--kc-border)" }}>
                      <td
                        style={{
                          padding: "10px 12px",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.83rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {e.date}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.83rem",
                          color: "var(--kc-accent)",
                        }}
                      >
                        {e.daysAlive?.toLocaleString() ?? "—"}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <ScorePill value={e.mood} />
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <ScorePill value={e.energy} />
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <ScorePill value={e.focus} />
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "var(--kc-accent)",
                          fontSize: "0.83rem",
                        }}
                      >
                        {e.steps?.toLocaleString() ?? "—"}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "var(--kc-accent)",
                          fontSize: "0.83rem",
                        }}
                      >
                        {e.sleepHours ? `${e.sleepHours}h` : "—"}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "var(--kc-accent)",
                          fontSize: "0.83rem",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {e.location?.city ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

// ---- Form View ----

interface FormViewProps {
  form: FormState;
  setField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  location: DailyEntry["location"];
  weather: DailyEntry["weather"];
  locationLoading: boolean;
  fetchLocationWeather: () => void;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  saving: boolean;
  editMode: boolean;
  onSave: () => void;
  onCancelEdit: () => void;
}

function FormView({
  form,
  setField,
  location,
  weather,
  locationLoading,
  fetchLocationWeather,
  isRecording,
  startRecording,
  stopRecording,
  saving,
  editMode,
  onSave,
  onCancelEdit,
}: FormViewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Health inputs */}
      <section>
        <SectionSubLabel>Health Data</SectionSubLabel>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "12px" }}>
          {(
            [
              { key: "steps", label: "Steps", placeholder: "8000" },
              { key: "sleepHours", label: "Sleep (hrs)", placeholder: "7.5" },
              { key: "heartRate", label: "Heart Rate (bpm)", placeholder: "72" },
            ] as const
          ).map(({ key, label, placeholder }) => (
            <div key={key} style={{ flex: "1 1 150px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                {label}
              </label>
              <input
                type="number"
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setField(key, e.target.value)}
                className="kc-input"
              />
            </div>
          ))}
        </div>
        <p
          style={{
            marginTop: "10px",
            fontSize: "0.78rem",
            color: "var(--kc-accent)",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          Tip: pull stats from Apple Health or Google Fit, then enter manually here.
        </p>
      </section>

      {/* Score sliders */}
      <section>
        <SectionSubLabel>Daily Scores</SectionSubLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "12px" }}>
          {(["mood", "energy", "focus"] as const).map((key) => (
            <div key={key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: "0.95rem", textTransform: "capitalize" }}>
                  {key}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 700,
                    color: "var(--kc-link)",
                    fontSize: "1.15rem",
                  }}
                >
                  {form[key]}
                  <span
                    style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--kc-accent)" }}
                  >
                    /10
                  </span>
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={form[key]}
                onChange={(e) => setField(key, Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--kc-link)", cursor: "pointer" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.73rem",
                  color: "var(--kc-accent)",
                  marginTop: "2px",
                }}
              >
                <span>1 — Low</span>
                <span>5 — Neutral</span>
                <span>10 — High</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Weather */}
      <section>
        <SectionSubLabel>Location & Weather</SectionSubLabel>
        <div style={{ marginTop: "12px" }}>
          {location || weather ? (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              {location && (
                <span
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.88rem" }}
                >
                  📍 {location.city ?? `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}`}
                </span>
              )}
              {weather && (
                <span
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.88rem" }}
                >
                  🌡 {weather.temp}°F — {weather.condition}
                  {weather.humidity != null && ` · ${weather.humidity}% humidity`}
                </span>
              )}
              <button
                className="btn-kc btn-kc-outline"
                style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                onClick={fetchLocationWeather}
              >
                Refresh
              </button>
            </div>
          ) : (
            <button
              className="btn-kc btn-kc-outline"
              onClick={fetchLocationWeather}
              disabled={locationLoading}
              style={{ opacity: locationLoading ? 0.6 : 1 }}
            >
              {locationLoading ? "Fetching..." : "📍 Get Location & Weather"}
            </button>
          )}
        </div>
      </section>

      {/* Voice Journal */}
      <section>
        <SectionSubLabel>Journal</SectionSubLabel>
        <div style={{ marginTop: "12px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
            <button
              className={`btn-kc ${isRecording ? "btn-kc-primary" : "btn-kc-outline"}`}
              style={{ padding: "8px 16px", fontSize: "0.88rem" }}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? "⏹ Stop" : "🎤 Voice"}
            </button>
            {isRecording && (
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.82rem",
                  color: "var(--kc-link)",
                }}
              >
                ● Recording...
              </span>
            )}
          </div>
          <textarea
            value={form.journalText}
            onChange={(e) => setField("journalText", e.target.value)}
            placeholder="Today's thoughts, reflections, what happened..."
            className="kc-input"
            rows={5}
            style={{ resize: "vertical", fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}
          />
        </div>
      </section>

      {/* Actions */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button className="btn-kc btn-kc-primary" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save Entry"}
        </button>
        {editMode && (
          <button className="btn-kc btn-kc-outline" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

// ---- Entry View (read-only) ----

function EntryView({ entry }: { entry: DailyEntry }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {entry.steps != null && <StatChip label="Steps" value={entry.steps.toLocaleString()} />}
        {entry.sleepHours != null && <StatChip label="Sleep" value={`${entry.sleepHours}h`} />}
        {entry.heartRate != null && (
          <StatChip label="Heart Rate" value={`${entry.heartRate} bpm`} />
        )}
        <ScoreChip label="Mood" value={entry.mood} />
        <ScoreChip label="Energy" value={entry.energy} />
        <ScoreChip label="Focus" value={entry.focus} />
      </div>

      {(entry.location || entry.weather) && (
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.88rem",
            color: "var(--kc-accent)",
          }}
        >
          {entry.location && (
            <span>
              📍{" "}
              {entry.location.city ??
                `${entry.location.lat.toFixed(3)}, ${entry.location.lng.toFixed(3)}`}
            </span>
          )}
          {entry.weather && (
            <span>
              {entry.location ? " · " : ""}🌡 {entry.weather.temp}°F — {entry.weather.condition}
              {entry.weather.humidity != null && ` · ${entry.weather.humidity}% humidity`}
            </span>
          )}
        </div>
      )}

      {entry.journalText && (
        <div
          style={{
            background: "#f9f9f9",
            borderRadius: "8px",
            padding: "16px 20px",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            borderLeft: "3px solid var(--kc-link)",
            whiteSpace: "pre-wrap",
          }}
        >
          {entry.journalText}
        </div>
      )}

      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.78rem",
          color: "var(--kc-accent)",
        }}
      >
        Logged at {new Date(entry.updatedAt).toLocaleTimeString()}
      </div>
    </div>
  );
}

// ---- Small display components ----

function SectionSubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "0.78rem",
        fontFamily: "'IBM Plex Mono', monospace",
        color: "var(--kc-accent)",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#f5f5f5",
        borderRadius: "8px",
        padding: "12px 16px",
        minWidth: "88px",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          color: "var(--kc-accent)",
          fontFamily: "'IBM Plex Mono', monospace",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>{value}</div>
    </div>
  );
}

function ScoreChip({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: "#f5f5f5",
        borderRadius: "8px",
        padding: "12px 16px",
        minWidth: "88px",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          color: "var(--kc-accent)",
          fontFamily: "'IBM Plex Mono', monospace",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--kc-link)" }}>
        {value}
        <span style={{ fontSize: "0.72rem", fontWeight: 400, color: "var(--kc-accent)" }}>
          /10
        </span>
      </div>
    </div>
  );
}

function ScorePill({ value }: { value: number }) {
  const color = value >= 7 ? "#22c55e" : value >= 4 ? "#f59e0b" : "#ef4444";
  return (
    <span
      style={{
        background: color + "22",
        color,
        borderRadius: "4px",
        padding: "2px 8px",
        fontWeight: 700,
        fontSize: "0.83rem",
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      {value}
    </span>
  );
}
