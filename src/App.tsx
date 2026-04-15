import type { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './components/header';
import { RequireAuth } from './components/require-auth';
import { RequireRole } from './components/require-role';
import { AuthProvider } from './context/auth-context';
import { AdminPage } from './pages/admin';
import { DashboardPage } from './pages/dashboard';
import { LoginPage } from './pages/login';
import { PublicPage } from './pages/public';

export function App(): ReactElement {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />

        <main className="app-shell">
          <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              }
            />

            {/* TODO: Wrap AdminPage with RequireAuth and RequireRole (role="admin") */}
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminPage />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
