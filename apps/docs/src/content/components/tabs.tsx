import { Tabs, TabsList, TabsTab, TabsPanel } from "@farmui/core";
import type { ComponentDoc } from "@/docs/types";

const doc: ComponentDoc = {
  slug: "tabs",
  name: "Tabs",
  category: "Navigation",
  description: "Switch between related panels of content in the same view.",
  importLine: `import { Tabs } from "@farmui/core";`,
  demos: [
    {
      title: "Basic",
      description:
        "Uncontrolled via defaultValue. Arrow keys move between tabs.",
      code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTab value="account">Account</TabsTab>
    <TabsTab value="security">Security</TabsTab>
    <TabsTab value="notifications">Notifications</TabsTab>
  </TabsList>
  <TabsPanel value="account">Update your name and email address.</TabsPanel>
  <TabsPanel value="security">Change your password and enable 2FA.</TabsPanel>
  <TabsPanel value="notifications">Choose how you want to be notified.</TabsPanel>
</Tabs>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "28rem" }}>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTab value="account">Account</TabsTab>
              <TabsTab value="security">Security</TabsTab>
              <TabsTab value="notifications">Notifications</TabsTab>
            </TabsList>
            <TabsPanel value="account">
              Update your name and email address.
            </TabsPanel>
            <TabsPanel value="security">
              Change your password and enable 2FA.
            </TabsPanel>
            <TabsPanel value="notifications">
              Choose how you want to be notified.
            </TabsPanel>
          </Tabs>
        </div>
      ),
    },
    {
      title: "With icons",
      description:
        "Use leftSection to place an icon or emoji before the label.",
      code: `<Tabs defaultValue="files">
  <TabsList>
    <TabsTab value="files" leftSection={<span aria-hidden>📄</span>}>Files</TabsTab>
    <TabsTab value="team" leftSection={<span aria-hidden>👥</span>}>Team</TabsTab>
    <TabsTab value="settings" leftSection={<span aria-hidden>⚙️</span>}>Settings</TabsTab>
  </TabsList>
  <TabsPanel value="files">All your documents in one place.</TabsPanel>
  <TabsPanel value="team">Invite teammates and manage roles.</TabsPanel>
  <TabsPanel value="settings">Configure your workspace preferences.</TabsPanel>
</Tabs>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "28rem" }}>
          <Tabs defaultValue="files">
            <TabsList>
              <TabsTab value="files" leftSection={<span aria-hidden>📄</span>}>
                Files
              </TabsTab>
              <TabsTab value="team" leftSection={<span aria-hidden>👥</span>}>
                Team
              </TabsTab>
              <TabsTab
                value="settings"
                leftSection={<span aria-hidden>⚙️</span>}
              >
                Settings
              </TabsTab>
            </TabsList>
            <TabsPanel value="files">
              All your documents in one place.
            </TabsPanel>
            <TabsPanel value="team">
              Invite teammates and manage roles.
            </TabsPanel>
            <TabsPanel value="settings">
              Configure your workspace preferences.
            </TabsPanel>
          </Tabs>
        </div>
      ),
    },
    {
      title: "Disabled tab",
      description: "A disabled tab is skipped by keyboard navigation.",
      code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="reports">Reports</TabsTab>
    <TabsTab value="billing" disabled>Billing</TabsTab>
  </TabsList>
  <TabsPanel value="overview">Everything at a glance.</TabsPanel>
  <TabsPanel value="reports">Usage for the last month.</TabsPanel>
  <TabsPanel value="billing">Upgrade to unlock billing.</TabsPanel>
</Tabs>`,
      render: () => (
        <div style={{ inlineSize: "100%", maxInlineSize: "28rem" }}>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTab value="overview">Overview</TabsTab>
              <TabsTab value="reports">Reports</TabsTab>
              <TabsTab value="billing" disabled>
                Billing
              </TabsTab>
            </TabsList>
            <TabsPanel value="overview">Everything at a glance.</TabsPanel>
            <TabsPanel value="reports">Usage for the last month.</TabsPanel>
            <TabsPanel value="billing">Upgrade to unlock billing.</TabsPanel>
          </Tabs>
        </div>
      ),
    },
  ],
  props: [
    {
      name: "defaultValue",
      type: "string",
      description: "Value of the tab active by default (uncontrolled).",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled active tab value.",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Called with the new value when the active tab changes.",
    },
    {
      name: "TabsTab value",
      type: "string",
      description: "Unique value linking a tab to its panel (required).",
    },
    {
      name: "TabsTab leftSection",
      type: "ReactNode",
      description: "Content (icon/emoji) rendered before the tab label.",
    },
    {
      name: "TabsTab disabled",
      type: "boolean",
      description: "Disable the tab and skip it in keyboard navigation.",
    },
    {
      name: "TabsPanel value",
      type: "string",
      description: "Value of the tab this panel belongs to (required).",
    },
    {
      name: "...others",
      type: "HTMLAttributes",
      description: "All native <div>/<button> props are forwarded.",
    },
  ],
};

export default doc;
