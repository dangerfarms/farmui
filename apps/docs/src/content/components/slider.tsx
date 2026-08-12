import { Slider } from "@farmui/core";
import type { ComponentContent } from "@/renderer/types";
import { SliderFieldDemo, SliderValueDemo } from "./slider.client";

const doc: ComponentContent = {
  slug: "slider",
  lead: "Pick a numeric value from a continuous range.",
  importLine: `import { Slider } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      code: `<Slider defaultValue={40} />`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Slider defaultValue={40} aria-label="Value" />
        </div>
      ),
    },
    {
      title: "With label",
      code: `<Slider label="Water level" defaultValue={65} />`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Slider label="Water level" defaultValue={65} />
        </div>
      ),
    },
    {
      title: "Composed inside a Field",
      description:
        "The bare SliderControl composes through Field.Control — label, description and error wiring come from the Field, the composition pattern shared by all form controls.",
      code: `<Field.Root>
  <Field.Label>Volume</Field.Label>
  <Field.Description>Applies to alerts only.</Field.Description>
  <Field.Control render={<SliderControl defaultValue={70} />} />
</Field.Root>`,
      render: () => <SliderFieldDemo />,
    },
    {
      title: "Steps",
      description: "Snap to increments with the step prop.",
      code: `<Slider label="Fertiliser (kg)" min={0} max={100} step={10} defaultValue={30} />`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Slider
            label="Fertiliser (kg)"
            min={0}
            max={100}
            step={10}
            defaultValue={30}
          />
        </div>
      ),
    },
    {
      title: "Disabled",
      code: `<Slider label="Locked" defaultValue={50} disabled />`,
      render: () => (
        <div style={{ maxInlineSize: "22rem", inlineSize: "100%" }}>
          <Slider label="Locked" defaultValue={50} disabled />
        </div>
      ),
    },
  ],
  whenToUse: [
    "For imprecise, pick-a-feel values where the position matters more than the exact number: volume, brightness, intensity.",
    "When the effect of the value is visible as it changes, so users steer by the result rather than the figure.",
  ],
  whenNotToUse: [
    'For exact numbers the user already knows (a quantity, an amount, a year) — use Input with inputMode="numeric" or "decimal"; landing on one precise value on a track is slow and error-prone, especially on touch.',
    "For choosing among a few discrete options — use RadioGroup, where every option is visible and labelled.",
  ],
  howItWorks: [
    {
      title: "Show the current value",
      body: "A track communicates roughly where you are, never what you chose — so render the number where the user can see it. The label accepts any ReactNode and the component is stateless, so drive it with value and onChange and put the live value in the label.",
      code: `const [volume, setVolume] = useState(70);

<Slider
  label={\`Volume: \${volume}\`}
  value={volume}
  onChange={(e) => setVolume(e.target.valueAsNumber)}
/>`,
      render: () => <SliderValueDemo />,
    },
    {
      title: "Steps match the precision users care about",
      body: "step sets the smallest move a user can make, so match it to differences that actually matter: nobody sets fertiliser to 43 kg. A coarser step makes every reachable value a bigger target — easier with arrow keys, a mouse, or a thumb. If users need finer precision than a comfortable step allows, the value is exact and belongs in an Input.",
    },
  ],
  accessibility: [
    'Renders a native <input type="range">: arrow keys adjust the value and Home/End jump to the ends, with the current value announced — no custom key handling to maintain.',
    "Always give it an accessible name: the label prop, or an aria-label when rendering the bare control or a bare SliderControl.",
    "Assistive tech hears the value change as it moves; sighted users have no equivalent unless you render the value visibly — see above.",
  ],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Field label rendered above the track.",
    },
    {
      name: "SliderControl",
      type: "component",
      description:
        "The bare range input without a label — composes inside Field and reads its wiring (id, aria-describedby, aria-invalid) from context.",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value.",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value.",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Increment between valid values.",
    },
    {
      name: "defaultValue",
      type: "number",
      description: "Initial value for uncontrolled usage.",
    },
    {
      name: "...others",
      type: "InputHTMLAttributes",
      description: 'All native <input type="range"> props are forwarded.',
    },
  ],
};

export default doc;
