import type { HTMLAttributes, PropsWithChildren, ReactElement, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

function Root({ children, ...props }: PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>): ReactElement {
  return (
    <table className="users-table" {...props}>
      {children}
    </table>
  );
}

function Header({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>): ReactElement {
  return <thead {...props}>{children}</thead>;
}

function Body({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>): ReactElement {
  return <tbody {...props}>{children}</tbody>;
}

function Row({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>): ReactElement {
  return <tr {...props}>{children}</tr>;
}

function HeadCell({ children, ...props }: PropsWithChildren<ThHTMLAttributes<HTMLTableCellElement>>): ReactElement {
  return <th {...props}>{children}</th>;
}

function Cell({ children, ...props }: PropsWithChildren<TdHTMLAttributes<HTMLTableCellElement>>): ReactElement {
  return <td {...props}>{children}</td>;
}

export const DataTable = {
  Root,
  Header,
  Body,
  Row,
  HeadCell,
  Cell,
};
