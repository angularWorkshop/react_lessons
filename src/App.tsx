import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/home';
import { Feedback } from './pages/feedback';
import { feedbackAction } from './actions/feedback-action';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/feedback', element: <Feedback />, action: feedbackAction },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
