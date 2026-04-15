import type { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Header } from './components/header';
import { AboutPage } from './pages/about';
import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/not-found';
import { UserDetailPage } from './pages/user-detail';
import { UsersPage } from './pages/users';

export function App(): ReactElement {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
