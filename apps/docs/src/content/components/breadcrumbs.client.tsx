"use client";

import { Breadcrumbs } from "@farmui/core";

export function BreadcrumbsBasicDemo() {
  return (
    <Breadcrumbs.Root>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Billing</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  );
}

export function BreadcrumbsSeparatorDemo() {
  return (
    <Breadcrumbs.Root separator="→">
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Website Redesign</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  );
}

export function BreadcrumbsRenderDemo() {
  return (
    <Breadcrumbs.Root>
      <Breadcrumbs.Item render={<a href="/" />}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item render={<a href="/settings" />}>Settings</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Billing</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  );
}
