import prose from "../prose.module.css";

export const metadata = {
  title: "Accessibility",
  description:
    "What FarmUI guarantees: platform semantics, APG keyboard patterns, engineered WCAG specifics, and user preferences as the baseline.",
};

export default function Accessibility() {
  return (
    <div className={prose.prose}>
      <h1>Accessibility</h1>
      <p className={prose.lead}>
        FarmUI&apos;s accessibility comes from the platform first: real elements with built-in
        semantics, native behaviours instead of re-implementations, and ARIA only where the platform
        has no word for something. On top of that sit specific, engineered guarantees, listed here
        together with how they are tested and where the limits are.
      </p>

      <h2>Semantics from the platform</h2>
      <ul>
        <li>
          Buttons are <code>&lt;button&gt;</code>, dialogs are <code>&lt;dialog&gt;</code> opened
          with <code>showModal()</code> (focus containment, Escape, and focus restore are the
          browser&apos;s), accordions are <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code>{" "}
          with native exclusivity via <code>name</code>, separators are <code>&lt;hr&gt;</code>,
          grouped controls use <code>&lt;fieldset&gt;</code>/<code>&lt;legend&gt;</code>.
        </li>
        <li>
          Every styled form control wraps a real native input: checkboxes, radios, switches (a
          checkbox with <code>role=&quot;switch&quot;</code>
          ), sliders (<code>&lt;input type=&quot;range&quot;&gt;</code>). So keyboard operation,
          form participation, and assistive-technology reporting come from the platform.
        </li>
        <li>
          Toasts are native live regions: <code>role=&quot;status&quot;</code> announces politely;{" "}
          <code>priority: &quot;high&quot;</code> renders <code>role=&quot;alert&quot;</code> and
          interrupts. Field errors are <code>role=&quot;alert&quot;</code> and joined to their
          control via composed <code>aria-describedby</code>.
        </li>
      </ul>

      <h2>Keyboard patterns</h2>
      <ul>
        <li>
          <strong>Menu</strong> implements the APG menu-button pattern: ArrowDown/ArrowUp on the
          trigger open and focus the first/last item; inside, arrow keys rove real focus (looping),
          Home/End jump, typing jumps to the next matching item, and Escape or activation returns
          focus to the trigger. Focus moves — it is never trapped.
        </li>
        <li>
          <strong>Tabs</strong> follow the tabs pattern with <code>aria-selected</code> wiring, and
          inactive panels stay reachable by find-in-page (
          <code>hidden=&quot;until-found&quot;</code> where supported; a match activates the tab).
        </li>
        <li>
          <strong>Tooltips</strong> open on keyboard focus as well as hover, and F6 jumps into the{" "}
          <strong>toast</strong> viewport (a labelled region) so a toast&apos;s action is reachable
          from anywhere.
        </li>
        <li>
          Disabled menu items use <code>aria-disabled</code> (visible to assistive technology,
          skipped by roving focus) rather than vanishing from the accessibility tree.
        </li>
      </ul>

      <h2>Engineered WCAG specifics</h2>
      <ul>
        <li>
          <strong>1.4.13 (Content on Hover or Focus)</strong>: tooltips are dismissible with Escape
          without moving focus, hoverable across the gap onto the bubble, and persistent while
          hovered or focused; hover and focus are tracked independently so a passing pointer cannot
          steal a focused trigger&apos;s tooltip.
        </li>
        <li>
          <strong>2.2.1 (Timing Adjustable)</strong>: toast auto-dismiss timers pause while the
          pointer or keyboard focus is inside the viewport and resume with the remaining time.
        </li>
        <li>
          <strong>2.5.8 (Target Size)</strong>: the checkbox&apos;s invisible hit area is floored at
          24px even where the visible box is smaller; buttons and text controls share a derived
          anatomy that keeps them comfortably above the minimum at every container width.
        </li>
        <li>
          <strong>Focus visibility</strong>: every interactive element shows a brand{" "}
          <code>:focus-visible</code> outline offset from the control, so the true surface shows
          through the gap and the ring reads as separate on any background. Focus styling is never
          removed without a replacement.
        </li>
        <li>
          <strong>Not colour alone</strong>: state always carries a second signal: the tick and dash
          glyphs on checkboxes, thumb position on switches, the error message text beside a danger
          border, the word &quot;(optional)&quot; beside labels.
        </li>
      </ul>

      <h2>User preferences are the baseline</h2>
      <p>
        The user&apos;s stated preferences are the default state, and everything beyond them is an
        explicit opt-in:
      </p>
      <ul>
        <li>
          <strong>Motion is opt-in.</strong> Animations and large transitions exist only inside{" "}
          <code>prefers-reduced-motion: no-preference</code>; the absence of motion is the baseline,
          so nothing needs to be switched off.
        </li>
        <li>
          <strong>Colour scheme is followed natively</strong> via <code>color-scheme</code> and{" "}
          <code>light-dark()</code> tokens; the <code>data-theme</code> attribute is the explicit
          override.
        </li>
        <li>
          <strong>Forced colours are honoured, not fought.</strong> Every component is verified
          under forced-colors mode; where a state was carried only by background paint (switch
          tracks, radio dots, progress fills, selection highlights) it is re-expressed in system
          colours (<code>Highlight</code>, <code>CanvasText</code>, <code>GrayText</code>) inside{" "}
          <code>@media (forced-colors: active)</code>.
        </li>
      </ul>

      <h2>ARIA is derived, not declared</h2>
      <p>
        Accessibility state is derived from one source of truth rather than set by hand. A field is
        invalid exactly when it contains a rendered error message: the CSS detects it with{" "}
        <code>:has()</code> and <code>aria-invalid</code> is wired from the same fact. On the native
        validation path, the platform&apos;s own <code>:user-invalid</code> verdict is mirrored onto{" "}
        <code>aria-invalid</code> at blur and submit, so what assistive technology hears always
        matches what the screen shows. Icon-only buttons are detected by the <code>aria-label</code>{" "}
        they must carry anyway; the compact style only appears when the button is correctly
        labelled.
      </p>

      <h2>Forms guidance</h2>
      <p>
        Labels are real <code>&lt;label&gt;</code> elements tied to their controls; placeholders are
        never used as labels. Optional fields are marked with the word &quot;(optional)&quot;; there
        is no asterisk convention, and the requirement itself is conveyed by the native{" "}
        <code>required</code> attribute. Buttons act, links navigate: a button that navigates breaks
        right-click, middle-click and open-in-new-tab.
      </p>

      <h2>How this is tested — and the limits</h2>
      <ul>
        <li>
          An axe audit runs over a representative render of every component in the unit suite, and
          keyboard behaviour (roving focus, looping, typeahead, focus return, dismissal) is asserted
          by interaction tests.
        </li>
        <li>
          Storybook runs the a11y addon and interaction tests in a real browser, covering what jsdom
          cannot (native dialog focus, popovers, computed styles).
        </li>
        <li>
          Colour contrast is checked in the browser-based Storybook tooling, not in the unit suite;
          forced-colors rendering is verified with emulation; and no automated tool replaces testing
          with actual screen readers. Treat this page as the contract, not a substitute for testing
          your composed product.
        </li>
      </ul>
    </div>
  );
}
