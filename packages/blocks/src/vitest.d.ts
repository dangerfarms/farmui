// Brings the matcher type augmentations into the `tsc` program.
import "@testing-library/jest-dom/vitest";

declare module "vitest" {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
