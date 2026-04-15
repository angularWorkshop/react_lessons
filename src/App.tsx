import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/header';
import { RequireAuth } from './components/require-auth';
import { ErrorBoundary } from './components/error-boundary';

const BoardPage = lazy(() => import('./pages/board'));
const CreateTaskPage = lazy(() => import('./pages/create-task'));
const LoginPage = lazy(() => import('./pages/login'));
const NotFoundPage = lazy(() => import('./pages/not-found'));

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Header />
        <main className="main-content">
          <Suspense fallback={<div className="loading">Loading…</div>}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/board"
                element={
                  <RequireAuth>
                    <BoardPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/create"
                element={
                  <RequireAuth>
                    <CreateTaskPage />
                  </RequireAuth>
                }
              />
              <Route path="/" element={<Navigate to="/board" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
