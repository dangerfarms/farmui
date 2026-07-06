import { Avatar, AvatarGroup } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const IMG =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=faces";

const doc: ComponentDoc = {
  slug: "avatar",
  name: "Avatar",
  category: "Data display",
  description: "An image, initials, or fallback glyph representing a user.",
  importLine: `import { Avatar, AvatarGroup } from "@farmui/core";`,
  demos: [
    {
      title: "Image",
      description: "Pass a src to render a cover-fit image.",
      code: `<Avatar src="/user.jpg" name="Ada Lovelace" />`,
      render: () => <Avatar src={IMG} name="Ada Lovelace" />,
    },
    {
      title: "Initials",
      description:
        "With no image, initials are derived from name. Colors map to tokens.",
      code: `<Avatar name="Jane Doe" />
<Avatar name="Sam Reed" color="gray" />
<Avatar name="Amara Okafor" color="info" />
<Avatar />`,
      render: () => (
        <>
          <Avatar name="Jane Doe" />
          <Avatar name="Sam Reed" color="gray" />
          <Avatar name="Amara Okafor" color="info" />
          <Avatar />
        </>
      ),
    },
    {
      title: "Sizes",
      description: "Use a token or an explicit pixel number.",
      code: `<Avatar name="Jane Doe" size="sm" />
<Avatar name="Jane Doe" size="md" />
<Avatar name="Jane Doe" size="lg" />
<Avatar name="Jane Doe" size={72} />`,
      render: () => (
        <>
          <Avatar name="Jane Doe" size="sm" />
          <Avatar name="Jane Doe" size="md" />
          <Avatar name="Jane Doe" size="lg" />
          <Avatar name="Jane Doe" size={72} />
        </>
      ),
    },
    {
      title: "Group",
      description: "AvatarGroup overlaps children with a surface-colored ring.",
      code: `<AvatarGroup>
  <Avatar name="Jane Doe" />
  <Avatar name="Sam Reed" color="info" />
  <Avatar name="Amara Okafor" color="warning" />
  <Avatar name="+5" color="gray" />
</AvatarGroup>`,
      render: () => (
        <AvatarGroup>
          <Avatar name="Jane Doe" />
          <Avatar name="Sam Reed" color="info" />
          <Avatar name="Amara Okafor" color="warning" />
          <Avatar name="+5" color="gray" />
        </AvatarGroup>
      ),
    },
  ],
  props: [
    {
      name: "src",
      type: "string",
      description: "Image source. When set, renders an <img>.",
    },
    {
      name: "alt",
      type: "string",
      description: "Alt text for the image (falls back to name).",
    },
    {
      name: "name",
      type: "string",
      description: "Person's name; used for initials and as image alt.",
    },
    {
      name: "size",
      type: `"sm" | "md" | "lg" | number`,
      default: `"md"`,
      description: "Size token or explicit pixel size.",
    },
    {
      name: "radius",
      type: `"sm" | "md" | "lg" | "xl" | "full"`,
      default: `"full"`,
      description: "Border radius token.",
    },
    {
      name: "color",
      type: `"primary" | "gray" | "danger" | "warning" | "info"`,
      default: `"primary"`,
      description: "Background color for the initials/fallback state.",
    },
    {
      name: "...others",
      type: "SpanHTMLAttributes",
      description: "All native <span> props are forwarded.",
    },
  ],
};

export default doc;
