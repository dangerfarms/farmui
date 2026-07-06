import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ComponentDoc } from "./types";
import { Preview } from "./Preview";
import { CodeBlock } from "./CodeBlock";
import { PropsTable } from "./PropsTable";
import classes from "./DocPage.module.css";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Read a component's real, complete stylesheet from disk at build time.
 * This is the actual CSS that ships — showing it is the whole point.
 */
function readComponentCss(name: string): string | undefined {
  try {
    const file = join(
      process.cwd(),
      "..",
      "..",
      "packages",
      "core",
      "src",
      "components",
      name,
      `${name}.css`,
    );
    const raw = readFileSync(file, "utf8").trim();
    return `/* The complete stylesheet for <${name} /> — plain, static CSS.\n   Nothing runs in the browser: no CSS-in-JS, no runtime. */\n\n${raw}`;
  } catch {
    return undefined;
  }
}

export function DocPage({ doc }: { doc: ComponentDoc }) {
  const css = readComponentCss(doc.name);

  return (
    <article className={classes.page}>
      <header className={classes.header}>
        <p className={classes.category}>{doc.category}</p>
        <h1 className={classes.title}>{doc.name}</h1>
        <p className={classes.lead}>{doc.description}</p>
      </header>

      <section className={classes.section}>
        <h2 id="import" className={classes.h2}>
          Import
        </h2>
        <CodeBlock code={doc.importLine} />
      </section>

      <section className={classes.section}>
        <h2 id="usage" className={classes.h2}>
          Usage
        </h2>
        <p className={classes.usageNote}>
          Every example has a <strong>CSS</strong> tab — that&rsquo;s the real,
          complete stylesheet for the component. It&rsquo;s plain, static CSS:
          nothing runs in the browser.
        </p>
        <div className={classes.demos}>
          {doc.demos.map((demo) => (
            <div
              key={demo.title}
              id={slugify(demo.title)}
              className={classes.demo}
            >
              <h3 className={classes.h3}>{demo.title}</h3>
              {demo.description && (
                <p className={classes.demoDesc}>{demo.description}</p>
              )}
              <Preview code={demo.code} css={css}>
                {demo.render()}
              </Preview>
            </div>
          ))}
        </div>
      </section>

      <section className={classes.section}>
        <h2 id="props" className={classes.h2}>
          Props
        </h2>
        <PropsTable rows={doc.props} />
      </section>
    </article>
  );
}
