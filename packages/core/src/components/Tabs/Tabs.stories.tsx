import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tabs, TabsList, TabsTab, TabsPanel } from "../../index";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    defaultValue: "overview",
  },
  argTypes: {
    defaultValue: {
      control: "inline-radio",
      options: ["overview", "activity", "settings"],
    },
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="activity">Activity</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="overview">
        <p>Overview panel — a snapshot of everything at a glance.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p>Activity panel — the latest events on your account.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p>Settings panel — tweak your preferences here.</p>
      </TabsPanel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live playground — pick the default tab in the Controls panel. */
export const Playground: Story = {};

/** Tabs with an icon rendered before each label via `leftSection`. */
export const WithIcons: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview" leftSection={<span aria-hidden>🌾</span>}>
          Overview
        </TabsTab>
        <TabsTab value="activity" leftSection={<span aria-hidden>📈</span>}>
          Activity
        </TabsTab>
        <TabsTab value="settings" leftSection={<span aria-hidden>⚙️</span>}>
          Settings
        </TabsTab>
      </TabsList>
      <TabsPanel value="overview">
        <p>Overview panel — a snapshot of everything at a glance.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p>Activity panel — the latest events on your account.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p>Settings panel — tweak your preferences here.</p>
      </TabsPanel>
    </Tabs>
  ),
};

/** A disabled tab cannot be activated and is skipped by keyboard navigation. */
export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="activity">Activity</TabsTab>
        <TabsTab value="settings" disabled>
          Settings
        </TabsTab>
      </TabsList>
      <TabsPanel value="overview">
        <p>Overview panel — a snapshot of everything at a glance.</p>
      </TabsPanel>
      <TabsPanel value="activity">
        <p>Activity panel — the latest events on your account.</p>
      </TabsPanel>
      <TabsPanel value="settings">
        <p>Settings panel — you shouldn&apos;t be able to reach this.</p>
      </TabsPanel>
    </Tabs>
  ),
};

/**
 * Interaction test: clicking a tab reveals its panel. Inactive panels stay
 * mounted (they carry the `hidden` attribute) so we assert on *visibility*,
 * not presence.
 */
export const ClickSelectsPanel: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Overview is the default active tab.
    const overviewTab = canvas.getByRole("tab", { name: "Overview" });
    await expect(overviewTab).toHaveAttribute("aria-selected", "true");
    await expect(
      canvas.getByText(/a snapshot of everything at a glance/i),
    ).toBeVisible();

    // Activate the Activity tab.
    const activityTab = canvas.getByRole("tab", { name: "Activity" });
    await userEvent.click(activityTab);

    await expect(activityTab).toHaveAttribute("aria-selected", "true");
    await expect(overviewTab).toHaveAttribute("aria-selected", "false");

    // The activity panel is now visible; the overview panel stays mounted but hidden.
    await expect(
      canvas.getByText(/the latest events on your account/i),
    ).toBeVisible();
    await expect(
      canvas.getByText(/a snapshot of everything at a glance/i),
    ).not.toBeVisible();
  },
};
