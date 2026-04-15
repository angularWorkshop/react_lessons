import type { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from '../components/header';
import { Sidebar } from '../components/sidebar';

export function MainLayout(): ReactElement {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-8 py-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
