import type { ComponentDoc } from "@/docs/types";
import {
  MenuDemo,
  MenuDisabledDemo,
  MenuGroupsDemo,
  MenuLinksDemo,
} from "./menu.client";

const doc: ComponentDoc = {
  slug: "menu",
  name: "Menu",
  category: "Overlays",
  description:
    "A list of actions opened from a trigger — the APG menu-button pattern on top of the browser's top layer and anchor positioning.",
  importLine: `import { Menu } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "Compose the menu from parts and wire each item's onClick to its action. The popup uses the same engine as Popover — native popover attribute and anchor positioning where supported, a wrapper-anchored fallback elsewhere — with the APG menu-button keyboard pattern on top: arrow keys rove focus, typing jumps to a matching item, and activating one closes the menu and returns focus to the trigger.",
      code: `<Menu.Root>
  <Menu.Trigger>Options</Menu.Trigger>
  <Menu.Popup>
    <Menu.Item onClick={() => {}}>Rename</Menu.Item>
    <Menu.Item onClick={() => {}}>Duplicate</Menu.Item>
    <Menu.Item onClick={() => {}}>Move to folder…</Menu.Item>
  </Menu.Popup>
</Menu.Root>`,
      render: () => <MenuDemo />,
    },
    {
      title: "Groups and separators",
      description:
        "Group related items under a label; Menu.Separator is a real <hr>. Contextual meaning is a custom property — declare --fui-context: danger on the group and the items inside adopt the danger accent, no props involved.",
      code: `<Menu.Root>
  <Menu.Trigger>Workspace</Menu.Trigger>
  <Menu.Popup>
    <Menu.Item>Rename</Menu.Item>
    <Menu.Item>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Group style={{ "--fui-context": "danger" }}>
      <Menu.GroupLabel>Danger zone</Menu.GroupLabel>
      <Menu.Item>Delete workspace</Menu.Item>
    </Menu.Group>
  </Menu.Popup>
</Menu.Root>`,
      render: () => <MenuGroupsDemo />,
    },
    {
      title: "Links as items",
      description:
        "An Item with href renders as a real <a> — right-click and open-in-new-tab work. Use sparingly: menus are for actions, and destinations usually deserve visible links.",
      code: `<Menu.Root>
  <Menu.Trigger>Project</Menu.Trigger>
  <Menu.Popup>
    <Menu.Item>Rename</Menu.Item>
    <Menu.Separator />
    <Menu.Item href="#settings">Settings</Menu.Item>
    <Menu.Item href="#export">Export…</Menu.Item>
  </Menu.Popup>
</Menu.Root>`,
      render: () => <MenuLinksDemo />,
    },
    {
      title: "Disabled items",
      description:
        "Disabled items use aria-disabled, so they stay visible to assistive technology but are skipped by roving focus and cannot be activated.",
      code: `<Menu.Root>
  <Menu.Trigger>Document</Menu.Trigger>
  <Menu.Popup>
    <Menu.Item>Edit</Menu.Item>
    <Menu.Item disabled>Publish (needs review)</Menu.Item>
    <Menu.Item>Share</Menu.Item>
  </Menu.Popup>
</Menu.Root>`,
      render: () => <MenuDisabledDemo />,
    },
  ],
  whenToUse: [
    "For a short list of actions on an object — rename, duplicate, export, delete — collapsed behind a single trigger.",
    "When the actions are secondary enough that laying them all out as visible buttons would clutter the surface.",
  ],
  whenNotToUse: [
    "For choosing a value that persists — use Select, which has real selection semantics the menu role does not promise.",
    "For navigation — prefer visible links; a menu hides destinations behind an extra interaction (GOV.UK: don't hide the things users need).",
    "For one or two actions — plain Buttons are simpler and one click fewer.",
  ],
  accessibility: [
    "Implements the APG menu-button pattern: ArrowDown/ArrowUp on the trigger open the menu and focus the first/last item; inside, arrow keys rove focus through the items (looping), Home/End jump to the ends, and typing jumps to the next item matching the query.",
    "Escape closes and returns focus to the trigger, as does activating an item; Tab closes the menu and lets focus continue naturally — the menu moves focus, it never traps it.",
    "The trigger is a real <button> with aria-haspopup=\"menu\" and aria-expanded; the popup is role=\"menu\" with role=\"menuitem\" children, and Menu.Separator is a real <hr> — the platform's separator role, no ARIA needed.",
    "Disabled items use aria-disabled rather than disabled, so they remain visible to assistive technology while roving focus skips them.",
    "Where the popover attribute and anchor positioning are both supported, the browser provides top-layer rendering, light dismiss and Escape; other browsers get a wrapper-anchored fallback with the same behavior re-implemented — the deliberate no-polyfill trade-off (see the browser support policy in CONTRIBUTING).",
  ],
  props: [
    {
      name: "Root",
      type: "open?, defaultOpen?, onOpenChange?",
      description:
        "Groups the parts and owns open state (controlled or uncontrolled). Renders an inline wrapper used by the fallback positioning.",
    },
    {
      name: "Trigger",
      type: "button props · render?: element | (props) => node",
      description:
        "Renders a FarmUI Button wired as the menu button (aria-haspopup, aria-expanded, anchor name, arrow-key opening); it adapts to context like any Button. Substitute any element via render.",
    },
    {
      name: "Popup",
      type: `position?: "bottom" | "top"`,
      description:
        "The floating list (role=menu, popover attribute). position picks the side it opens toward; it flips at viewport edges in supporting browsers.",
    },
    {
      name: "Item",
      type: "href?, onClick?, closeOnClick?, disabled?, render?",
      description:
        "One action (role=menuitem). Renders a <button>, or a real <a> when href is set; substitute your own element (e.g. a router Link) via render. Activation runs onClick, then closes the menu unless closeOnClick={false}.",
    },
    {
      name: "Group / GroupLabel",
      type: "div props",
      description:
        "Group related items (role=group); a GroupLabel inside labels the group via aria-labelledby.",
    },
    {
      name: "Separator",
      type: "hr props",
      description: "A real <hr> between items — the platform's separator role.",
    },
  ],
};

export default doc;
