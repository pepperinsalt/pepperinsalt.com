import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePersistFn } from "./usePersistFn";

describe("usePersistFn", () => {
  it("should return a stable function reference", () => {
    const fn1 = () => {};
    const fn2 = () => {};

    const { result, rerender } = renderHook(({ fn }) => usePersistFn(fn), {
      initialProps: { fn: fn1 },
    });

    const persistFn1 = result.current;

    rerender({ fn: fn2 });
    const persistFn2 = result.current;

    expect(persistFn1).toBe(persistFn2);
    expect(typeof persistFn1).toBe("function");
  });

  it("should always call the latest function", () => {
    const fn1 = vi.fn().mockReturnValue("first");
    const fn2 = vi.fn().mockReturnValue("second");

    const { result, rerender } = renderHook(({ fn }) => usePersistFn(fn), {
      initialProps: { fn: fn1 },
    });

    // Call first version
    expect(result.current()).toBe("first");
    expect(fn1).toHaveBeenCalledTimes(1);

    // Update to second version
    rerender({ fn: fn2 });

    // Call persisted function again, should call fn2
    expect(result.current()).toBe("second");
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledTimes(1);
  });

  it("should pass arguments correctly", () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const { result } = renderHook(() => usePersistFn(fn));

    expect(result.current(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledWith(1, 2);
  });

  it("should maintain 'this' context", () => {
    const fn = vi.fn(function(this: any) { return this.name; });
    const { result } = renderHook(() => usePersistFn(fn));

    const context = { name: "test-context", persistFn: result.current };

    expect(context.persistFn()).toBe("test-context");
  });
});
