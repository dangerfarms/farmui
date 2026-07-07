/**
 * Local classnames joiner. Blocks are server components, so they must NOT import
 * `cx` from @farmui/core (a "use client" module — calling it on the server
 * throws). This tiny copy keeps blocks server-safe.
 */
export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(" ");
}
