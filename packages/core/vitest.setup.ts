// Extends vitest's `expect` with jest-dom + axe matchers (runtime).
import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as axeMatchers from "vitest-axe/matchers";

expect.extend(axeMatchers);
