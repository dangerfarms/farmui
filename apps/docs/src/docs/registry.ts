import type { ComponentDoc, Category } from "./types";
import { CATEGORY_ORDER } from "./types";

// Inputs
import button from "@/content/components/button";
import input from "@/content/components/input";
import textarea from "@/content/components/textarea";
import select from "@/content/components/select";
import checkbox from "@/content/components/checkbox";
import radio from "@/content/components/radio";
import switchDoc from "@/content/components/switch";
import slider from "@/content/components/slider";

// Data display
import badge from "@/content/components/badge";
import card from "@/content/components/card";
import avatar from "@/content/components/avatar";
import table from "@/content/components/table";
import kbd from "@/content/components/kbd";

// Feedback
import alert from "@/content/components/alert";
import progress from "@/content/components/progress";
import skeleton from "@/content/components/skeleton";
import loader from "@/content/components/loader";

// Overlays
import tooltip from "@/content/components/tooltip";
import modal from "@/content/components/modal";
import popover from "@/content/components/popover";

// Navigation
import tabs from "@/content/components/tabs";
import accordion from "@/content/components/accordion";
import breadcrumbs from "@/content/components/breadcrumbs";
import pagination from "@/content/components/pagination";

// Layout
import container from "@/content/components/container";
import grid from "@/content/components/grid";
import simpleGrid from "@/content/components/simple-grid";
import stack from "@/content/components/stack";
import group from "@/content/components/group";
import flex from "@/content/components/flex";
import center from "@/content/components/center";
import space from "@/content/components/space";
import aspectRatio from "@/content/components/aspect-ratio";

export const components: ComponentDoc[] = [
  button,
  input,
  textarea,
  select,
  checkbox,
  radio,
  switchDoc,
  slider,
  badge,
  card,
  avatar,
  table,
  kbd,
  alert,
  progress,
  skeleton,
  loader,
  tooltip,
  modal,
  popover,
  tabs,
  accordion,
  breadcrumbs,
  pagination,
  container,
  grid,
  simpleGrid,
  stack,
  group,
  flex,
  center,
  space,
  aspectRatio,
];

export function getComponent(slug: string): ComponentDoc | undefined {
  return components.find((c) => c.slug === slug);
}

export function componentsByCategory(): {
  category: Category;
  items: ComponentDoc[];
}[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: components
      .filter((c) => c.category === category)
      .sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.items.length > 0);
}
