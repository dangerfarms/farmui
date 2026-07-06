import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { CommandMenu } from "./CommandMenu";
import { GitHubIcon, StarIcon } from "./Icons";
import classes from "./Header.module.css";

const GITHUB_URL = "https://github.com/dangerfarms/farmui";

export function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <div className={classes.left}>
          <Logo />
          <nav className={classes.nav} aria-label="Primary">
            <Link href="/docs">Docs</Link>
            <Link href="/docs/components/button">Components</Link>
            <Link href="/docs/theming">Theming</Link>
          </nav>
        </div>

        <div className={classes.right}>
          <div className={classes.search}>
            <CommandMenu />
          </div>
          <a
            className={classes.stars}
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Star FarmUI on GitHub"
          >
            <GitHubIcon width={16} height={16} />
            <span className={classes.starCount}>
              <StarIcon width={13} height={13} />
              32.4k
            </span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
