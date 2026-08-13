"use client";

import { useCallback, useState } from "react";
import type { FocusEvent, FormEvent } from "react";

/**
 * Mirrors the platform's `:user-invalid` judgement onto `aria-invalid` —
 * the pseudo-class is visual-only and assistive technology never hears it.
 * Re-reads the platform's verdict at the moments it can change (blur, and
 * the `invalid` event a submit attempt fires); no validation logic is
 * duplicated. An explicitly supplied `aria-invalid` always wins.
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

  const checkOnBlur = useCallback((e: FocusEvent<Element>) => check(e.currentTarget), [check]);
  const checkOnInvalid = useCallback((e: FormEvent<Element>) => check(e.currentTarget), [check]);

  return { nativeInvalid, checkOnBlur, checkOnInvalid };
}
