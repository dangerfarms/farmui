import { NavLinks } from "./NavLinks";
import classes from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <nav className={classes.sidebar} aria-label="Documentation">
      <NavLinks />
    </nav>
  );
}
