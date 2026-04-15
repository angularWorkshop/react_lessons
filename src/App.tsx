import type { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { AuthLayout } from './layouts/auth-layout';
import { MainLayout } from './layouts/main-layout';
import { DashboardIndexPage } from './pages/dashboard-index';
import { DashboardStatsPage } from './pages/dashboard-stats';
import { DashboardUsersPage } from './pages/dashboard-users';
import { LoginPage } from './pages/login';
import { NotFoundPage } from './pages/not-found';

export function App(): ReactElement {
  return (
    <Routes>
      {/* Main layout with sidebar — wraps dashboard routes */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardIndexPage />} />
        <Route path="/dashboard/stats" element={<DashboardStatsPage />} />
        <Route path="/dashboard/users" element={<DashboardUsersPage />} />
      </Route>

      {/* Auth layout without sidebar — wraps login */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
