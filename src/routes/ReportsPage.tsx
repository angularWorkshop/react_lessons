import type { ReactElement } from 'react';

const reportRows = [
  ['North region', 'Stable', '92% target hit'],
  ['West region', 'Watch', '81% target hit'],
  ['Partner network', 'Growing', '109% target hit'],
];

export function ReportsPage(): ReactElement {
  return (
    <section className="route-panel route-panel--heavy">
      <p className="eyebrow">Reports route</p>
      <h2>Executive reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Segment</th>
            <th>Status</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {reportRows.map(([segment, status, summary]) => (
            <tr key={segment}>
              <td>{segment}</td>
              <td>{status}</td>
              <td>{summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
