import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import type { CSSProperties, ReactElement } from "react";

import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  Badge,
  Card,
  Avatar,
  Table,
  Alert,
  Progress,
  Separator,
  Skeleton,
  Loader,
  Tooltip,
  Menu,
  Modal,
  Popover,
  Toast,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  Accordion,
  AccordionItem,
  Breadcrumbs,
  Pagination,
  Container,
  Grid,
  GridCol,
  SimpleGrid,
  Stack,
  Group,
  Flex,
  Center,
  Space,
  AspectRatio,
} from "../index";

afterEach(cleanup);

// Accessible, representative render of every component. axe (in jsdom) checks
// roles/names/ARIA structure — colour-contrast is covered live by Storybook's
// a11y addon in a real browser.
const cases: Array<[string, ReactElement]> = [
  ["Button", <Button>Save changes</Button>],
  ["Input", <Input label="Email" placeholder="you@example.com" />],
  ["Textarea", <Textarea label="Bio" />],
  ["Select", <Select label="Country" data={["United States", "Canada"]} />],
  ["Checkbox", <Checkbox label="Accept the terms" />],
  [
    "RadioGroup",
    <RadioGroup label="Plan" defaultValue="pro" data={["free", "pro"]} />,
  ],
  ["Switch", <Switch label="Email notifications" />],
  ["Slider", <Slider label="Volume" defaultValue={50} />],
  ["Badge", <Badge>New</Badge>],
  ["Card", <Card>Card content</Card>],
  ["Avatar", <Avatar name="Ada Lovelace" />],
  [
    "Table",
    <Table>
      <caption>Users</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ada</td>
          <td>Admin</td>
        </tr>
      </tbody>
    </Table>,
  ],
  [
    "Alert",
    <div style={{ "--fui-context": "info" } as CSSProperties}>
      <Alert title="Heads up">A new version is available.</Alert>
    </div>,
  ],
  [
    "Alert (composed)",
    <div style={{ "--fui-context": "warning" } as CSSProperties}>
      <Alert.Root>
        <Alert.Body>
          <Alert.Title>Storage almost full</Alert.Title>
          <Alert.Message>Free up space to keep syncing.</Alert.Message>
        </Alert.Body>
      </Alert.Root>
    </div>,
  ],
  ["Progress", <Progress value={40} aria-label="Upload progress" />],
  ["Separator", <Separator />],
  [
    "Separator (vertical, in a row)",
    <div style={{ display: "flex", gap: 8 }}>
      <span>Cut</span>
      <Separator orientation="vertical" />
      <span>Copy</span>
    </div>,
  ],
  [
    "Menu (open)",
    <Menu.Root defaultOpen>
      <Menu.Trigger>Options</Menu.Trigger>
      <Menu.Popup>
        <Menu.Item>Rename</Menu.Item>
        <Menu.Item href="/export">Export</Menu.Item>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>Danger zone</Menu.GroupLabel>
          <Menu.Item>Delete</Menu.Item>
        </Menu.Group>
      </Menu.Popup>
    </Menu.Root>,
  ],
  [
    "Toast (viewport with toast)",
    <Toast.Provider>
      <Toast.Viewport>
        <Toast.Root toast={{ id: "t1" }}>
          <Toast.Title>Saved</Toast.Title>
          <Toast.Description>Your changes are live.</Toast.Description>
          <Toast.Close toastId="t1" />
        </Toast.Root>
      </Toast.Viewport>
    </Toast.Provider>,
  ],
  ["Skeleton", <Skeleton width={200} height={16} />],
  ["Loader", <Loader />],
  [
    "Tooltip",
    <Tooltip.Root defaultOpen>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Tooltip.Popup>
        More info <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Root>,
  ],
  [
    "Popover",
    <Popover.Root defaultOpen>
      <Popover.Trigger>Open</Popover.Trigger>
      <Popover.Popup>
        <Popover.Title>Panel</Popover.Title>
        <Popover.Description>Popover content</Popover.Description>
        <Popover.Close>Close</Popover.Close>
      </Popover.Popup>
    </Popover.Root>,
  ],
  [
    "Tabs",
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTab value="a">Account</TabsTab>
        <TabsTab value="b">Security</TabsTab>
      </TabsList>
      <TabsPanel value="a">Account panel</TabsPanel>
      <TabsPanel value="b">Security panel</TabsPanel>
    </Tabs>,
  ],
  [
    "Accordion",
    <Accordion>
      <AccordionItem label="What is FarmUI?">
        A component library.
      </AccordionItem>
    </Accordion>,
  ],
  [
    "Breadcrumbs",
    <Breadcrumbs.Root>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Billing</Breadcrumbs.Item>
    </Breadcrumbs.Root>,
  ],
  ["Pagination", <Pagination total={5} value={1} onChange={() => {}} />],
  ["Container", <Container>Content</Container>],
  [
    "Grid",
    <Grid>
      <GridCol span={6}>A</GridCol>
      <GridCol span={6}>B</GridCol>
    </Grid>,
  ],
  [
    "SimpleGrid",
    <SimpleGrid cols={2}>
      <div>A</div>
      <div>B</div>
    </SimpleGrid>,
  ],
  [
    "Stack",
    <Stack>
      <div>A</div>
      <div>B</div>
    </Stack>,
  ],
  [
    "Group",
    <Group>
      <div>A</div>
      <div>B</div>
    </Group>,
  ],
  [
    "Flex",
    <Flex>
      <div>A</div>
    </Flex>,
  ],
  ["Center", <Center>Centered</Center>],
  ["Space", <Space h="md" />],
  [
    "AspectRatio",
    <AspectRatio ratio={16 / 9}>
      <img src="/x.jpg" alt="Example" />
    </AspectRatio>,
  ],
];

// Colour-contrast needs a real browser to compute styles (jsdom can't), so we
// disable just that rule here — it's checked live by Storybook's a11y addon.
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("accessibility (axe)", () => {
  it.each(cases)("%s has no axe violations", async (_name, ui) => {
    const { container } = render(ui);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("Modal (open dialog) has no axe violations", async () => {
    render(
      <Modal.Root defaultOpen>
        <Modal.Trigger>Order</Modal.Trigger>
        <Modal.Popup>
          <Modal.Title>Order confirmed</Modal.Title>
          <Modal.Description>Your order is on its way.</Modal.Description>
          <Modal.Close>Close</Modal.Close>
        </Modal.Popup>
      </Modal.Root>,
    );
    expect(await axe(document.body, axeOptions)).toHaveNoViolations();
  });
});
