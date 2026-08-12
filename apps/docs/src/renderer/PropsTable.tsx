import type { PropRow } from "./types";
import classes from "./PropsTable.module.css";

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className={classes.scroll}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>
                <code className={classes.name}>{r.name}</code>
              </td>
              <td>
                <code className={classes.type}>{r.type}</code>
              </td>
              <td>
                {r.default ? (
                  <code className={classes.default}>{r.default}</code>
                ) : (
                  <span className={classes.dim}>—</span>
                )}
              </td>
              <td>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
