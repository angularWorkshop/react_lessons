import type { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from '../components/header';

export function AuthLayout(): ReactElement {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Header />
      <main className="mx-auto w-full max-w-md px-4 py-20">
        {/* TODO: render the matched child route here using <Outlet /> */}
      </main>
    </div>
  );
}
