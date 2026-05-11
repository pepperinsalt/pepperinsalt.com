import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("should merge tailwind classes", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("should handle conditional classes", () => {
    expect(cn("p-4", true && "m-4", false && "mt-4")).toBe("p-4 m-4");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["p-4", "m-4"])).toBe("p-4 m-4");
  });

  it("should handle objects with boolean values", () => {
    expect(cn({ "p-4": true, "m-4": false })).toBe("p-4");
  });

  it("should merge complex clsx inputs with tailwind-merge", () => {
    expect(
      cn(
        "text-sm font-medium",
        { "text-red-500": true, "bg-white": false },
        "text-lg", // This should override text-sm
        ["p-2", "p-4"] // p-4 should override p-2
      )
    ).toBe("font-medium text-red-500 text-lg p-4");
  });

  it("should handle empty inputs gracefully", () => {
    expect(cn()).toBe("");
    expect(cn(undefined, null, false, "")).toBe("");
  });
});
