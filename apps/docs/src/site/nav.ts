// Plain navigation index (no JSX) shared by the sidebar and command menu.
// Kept in sync with src/docs/registry.ts.

export interface NavItem {
  name: string;
  slug: string;
  category: string;
  description: string;
}

export const GETTING_STARTED: { name: string; href: string }[] = [
  { name: "Introduction", href: "/docs" },
  { name: "Installation", href: "/docs/installation" },
  { name: "Theming", href: "/docs/theming" },
];

export const CATEGORY_ORDER = [
  "Inputs",
  "Data display",
  "Feedback",
  "Overlays",
  "Navigation",
  "Layout",
] as const;

export const COMPONENTS: NavItem[] = [
  // Inputs
  {
    name: "Button",
    slug: "button",
    category: "Inputs",
    description: "Trigger an action or event.",
  },
  {
    name: "Input",
    slug: "input",
    category: "Inputs",
    description: "A labelled text field.",
  },
  {
    name: "Textarea",
    slug: "textarea",
    category: "Inputs",
    description: "Multi-line text input.",
  },
  {
    name: "Select",
    slug: "select",
    category: "Inputs",
    description: "Choose one option from a list.",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    category: "Inputs",
    description: "Toggle a single option on or off.",
  },
  {
    name: "Radio",
    slug: "radio",
    category: "Inputs",
    description: "Choose one option from a set.",
  },
  {
    name: "Switch",
    slug: "switch",
    category: "Inputs",
    description: "An on/off toggle switch.",
  },
  {
    name: "Slider",
    slug: "slider",
    category: "Inputs",
    description: "Pick a numeric value from a range.",
  },
  // Data display
  {
    name: "Badge",
    slug: "badge",
    category: "Data display",
    description: "Compact status or label pill.",
  },
  {
    name: "Card",
    slug: "card",
    category: "Data display",
    description: "A flexible surface container.",
  },
  {
    name: "Avatar",
    slug: "avatar",
    category: "Data display",
    description: "Represent a user with an image or initials.",
  },
  {
    name: "Table",
    slug: "table",
    category: "Data display",
    description: "Display rows and columns of data.",
  },
  {
    name: "Kbd",
    slug: "kbd",
    category: "Data display",
    description: "Render a keyboard key.",
  },
  // Feedback
  {
    name: "Alert",
    slug: "alert",
    category: "Feedback",
    description: "Draw attention to an important message.",
  },
  {
    name: "Progress",
    slug: "progress",
    category: "Feedback",
    description: "Show completion of a task.",
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    category: "Feedback",
    description: "Placeholder while content loads.",
  },
  {
    name: "Loader",
    slug: "loader",
    category: "Feedback",
    description: "Indicate an ongoing process.",
  },
  // Overlays
  {
    name: "Tooltip",
    slug: "tooltip",
    category: "Overlays",
    description: "Reveal info on hover or focus.",
  },
  {
    name: "Modal",
    slug: "modal",
    category: "Overlays",
    description: "A focused dialog over the page.",
  },
  {
    name: "Popover",
    slug: "popover",
    category: "Overlays",
    description: "Floating content anchored to a trigger.",
  },
  // Navigation
  {
    name: "Tabs",
    slug: "tabs",
    category: "Navigation",
    description: "Switch between related views.",
  },
  {
    name: "Accordion",
    slug: "accordion",
    category: "Navigation",
    description: "Collapsible stacked sections.",
  },
  {
    name: "Breadcrumbs",
    slug: "breadcrumbs",
    category: "Navigation",
    description: "Show the current page's location.",
  },
  {
    name: "Pagination",
    slug: "pagination",
    category: "Navigation",
    description: "Navigate between pages of content.",
  },
  // Layout
  {
    name: "Container",
    slug: "container",
    category: "Layout",
    description: "Constrain and center page content.",
  },
  {
    name: "Grid",
    slug: "grid",
    category: "Layout",
    description: "Responsive 12-column layout.",
  },
  {
    name: "SimpleGrid",
    slug: "simple-grid",
    category: "Layout",
    description: "Equal-width, responsive columns.",
  },
  {
    name: "Stack",
    slug: "stack",
    category: "Layout",
    description: "Vertical spacing between elements.",
  },
  {
    name: "Group",
    slug: "group",
    category: "Layout",
    description: "Horizontal spacing between elements.",
  },
  {
    name: "Flex",
    slug: "flex",
    category: "Layout",
    description: "A prop-driven flexbox wrapper.",
  },
  {
    name: "Center",
    slug: "center",
    category: "Layout",
    description: "Center content on both axes.",
  },
  {
    name: "Space",
    slug: "space",
    category: "Layout",
    description: "Add empty space between elements.",
  },
  {
    name: "AspectRatio",
    slug: "aspect-ratio",
    category: "Layout",
    description: "Constrain content to a fixed ratio.",
  },
];

export function componentsByCategory() {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: COMPONENTS.filter((c) => c.category === category),
  })).filter((g) => g.items.length > 0);
}
