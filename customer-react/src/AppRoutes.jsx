
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Customer from './views/Customer';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Customer />
      </ProtectedRoute>
    )
  },
  { path: '*', element: <Navigate to="/login" replace /> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
