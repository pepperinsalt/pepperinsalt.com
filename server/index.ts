import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENTRIES_FILE = path.join(process.cwd(), "data", "entries.json");

function ensureEntriesFile() {
  const dir = path.dirname(ENTRIES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(ENTRIES_FILE)) fs.writeFileSync(ENTRIES_FILE, "[]", "utf-8");
}

function readEntries() {
  try {
    return JSON.parse(fs.readFileSync(ENTRIES_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeEntries(entries: unknown[]) {
  fs.writeFileSync(ENTRIES_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

async function startServer() {
  ensureEntriesFile();

  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "1mb" }));

  // Entries API
  app.get("/api/entries", (_req, res) => {
    const entries = readEntries();
    entries.sort((a: Record<string, string>, b: Record<string, string>) => b.date.localeCompare(a.date));
    res.json(entries);
  });

  app.get("/api/entries/:date", (req, res) => {
    const entries = readEntries();
    const entry = entries.find((e: Record<string, string>) => e.date === req.params.date);
    if (entry) res.json(entry);
    else res.status(404).json({ error: "Not found" });
  });

  app.post("/api/entries", (req, res) => {
    const entries = readEntries();
    const body = req.body as Record<string, unknown>;
    const idx = entries.findIndex((e: Record<string, string>) => e.date === body.date);
    const now = new Date().toISOString();
    if (idx >= 0) {
      entries[idx] = { ...entries[idx], ...body, updatedAt: now };
      writeEntries(entries);
      res.json(entries[idx]);
    } else {
      const newEntry = { id: crypto.randomUUID(), ...body, createdAt: now, updatedAt: now };
      entries.push(newEntry);
      writeEntries(entries);
      res.status(201).json(newEntry);
    }
  });

  app.delete("/api/entries/:date", (req, res) => {
    const entries = readEntries();
    writeEntries(entries.filter((e: Record<string, string>) => e.date !== req.params.date));
    res.json({ ok: true });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
