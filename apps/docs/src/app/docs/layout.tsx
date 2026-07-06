import { Sidebar } from "@/site/Sidebar";
import classes from "./layout.module.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={classes.shell}>
      <aside className={classes.aside}>
        <div className={classes.asideInner}>
          <Sidebar />
        </div>
      </aside>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
