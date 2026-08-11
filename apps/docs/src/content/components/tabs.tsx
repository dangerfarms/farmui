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
  whenToUse: [
    "For parallel views of the same thing — Account / Security / Notifications are alternative facets of one settings object, and users need only one at a time.",
    "To keep related panels in one place without a page navigation, when switching views must not lose the surrounding context.",
  ],
  whenNotToUse: [
    "For steps in a sequence — tabs imply no order and let users jump anywhere, so a flow with dependencies belongs on separate pages with visible progress (GOV.UK).",
    "As primary navigation — switching a tab changes no URL and creates no history entry, so tabbed 'pages' can't be linked, bookmarked or reached with the back button.",
    "When users need to read or compare everything — content in an unselected tab may never be seen; stack it on the page under headings instead.",
  ],
  howItWorks: [
    {
      title: "Parallel views, not steps",
      body: "Tabs present alternative views of one subject; the order of the tab list carries no meaning and users can activate any tab at any moment. If the content is a sequence — where step two only makes sense after step one — tabs actively work against you, because they advertise that jumping ahead is fine. Use separate pages and show progress instead.",
    },
    {
      title: "A hidden tab is optional reading",
      body: "Many users never open a second tab, so nothing that everyone must see can live in one. Anything required — warnings, costs, prerequisites — goes above or outside the tabs, and the first tab gets the most-needed content because it is the only panel guaranteed to be read.",
    },
    {
      title: "Tabs are view state, not routes",
      body: "Switching a tab updates React state, not the URL — reloading returns to defaultValue and the back button ignores tab changes. When a view should be linkable, use the controlled form (value/onChange) and mirror the value in the query string yourself; if every view deserves its own URL, you want pages with links, not tabs.",
    },
  ],
  accessibility: [
    "The tab list uses a roving tabindex: only the active tab sits in the Tab order (tabIndex 0, the rest -1), so keyboard users cross the whole list in one Tab press instead of stepping through every tab.",
    "Arrow Left/Right move through the tabs and wrap at the ends, Home/End jump to the first and last, and disabled tabs are skipped; moving focus also selects — the newly focused tab is activated immediately, so no separate Enter press is needed.",
    "Inactive panels are hidden with hidden=\"until-found\" where the browser supports it, so find-in-page can match text inside a closed tab; a beforematch event then activates that tab. Browsers without support fall back to plain hidden.",
    "The wiring is generated from one id: role=\"tablist\"/\"tab\"/\"tabpanel\" with aria-selected, aria-controls on each tab and aria-labelledby on each panel, so assistive technology announces which tab is active and what it controls.",
    "Each panel has tabIndex 0, so a panel whose content contains no focusable element is still reachable — and scrollable — by keyboard.",
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
