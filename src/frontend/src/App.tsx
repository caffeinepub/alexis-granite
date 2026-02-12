import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AppLayout from './components/AppLayout';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute]);

const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
