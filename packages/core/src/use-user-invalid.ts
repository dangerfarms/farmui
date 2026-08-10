"use client";

import { useCallback, useState } from "react";
import type { FocusEvent, FormEvent } from "react";

/**
 * Mirrors the platform's `:user-invalid` judgement onto `aria-invalid`.
 *
 * The native constraint-validation path styles fields with zero JS via
 * `:user-invalid` — but that is visual-only: assistive technology never
 * hears about it. This hook re-reads the platform's own verdict at the
 * moments it can change (blur, and the `invalid` event a submit attempt
 * fires) and exposes it for the control's `aria-invalid`. The platform
 * stays the single source of truth — no validation logic is duplicated.
 *
 * An explicitly supplied `aria-invalid` (consumer prop or Field context)
 * always wins over this signal.
 */
export function useUserInvalid() {
  const [nativeInvalid, setNativeInvalid] = useState(false);

  const check = useCallback((el: Element) => {
    try {
      setNativeInvalid(el.matches(":user-invalid"));
    } catch {
      // Selector unsupported (e.g. jsdom) — the declared path still works.
    }
  }, []);

  const checkOnBlur = useCallback(
    (e: FocusEvent<Element>) => check(e.currentTarget),
    [check],
  );
  const checkOnInvalid = useCallback(
    (e: FormEvent<Element>) => check(e.currentTarget),
    [check],
  );

  return { nativeInvalid, checkOnBlur, checkOnInvalid };
}
