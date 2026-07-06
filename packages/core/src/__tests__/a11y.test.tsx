import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import type { ReactElement } from "react";

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
  Kbd,
  Alert,
  Progress,
  Skeleton,
  Loader,
  Tooltip,
  Modal,
  Popover,
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
  ["Kbd", <Kbd>K</Kbd>],
  [
    "Alert",
    <Alert color="info" title="Heads up">
      A new version is available.
    </Alert>,
  ],
  ["Progress", <Progress value={40} aria-label="Upload progress" />],
  ["Skeleton", <Skeleton width={200} height={16} />],
  ["Loader", <Loader />],
  [
    "Tooltip",
    <Tooltip label="More info">
      <Button>Hover me</Button>
    </Tooltip>,
  ],
  [
    "Popover",
    <Popover trigger={<Button>Open</Button>}>Popover content</Popover>,
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
    <Breadcrumbs>
      <a href="/">Home</a>
      <a href="/settings">Settings</a>
      <span>Billing</span>
    </Breadcrumbs>,
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

  it("Modal (portal) has no axe violations", async () => {
    render(
      <Modal opened onClose={() => {}} title="Order confirmed">
        Your order is on its way.
      </Modal>,
    );
    expect(await axe(document.body, axeOptions)).toHaveNoViolations();
  });
});
