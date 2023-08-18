import { lazy, Suspense } from 'react';

import { SecurableRoute } from '@astarx-studio/react-core/router';

import LoadingLayout from 'components/layouts/LoadingLayout';

const RedirectionLayout = lazy(() => import('components/layouts/RedirectionLayout'));
const LoginLayout = lazy(() => import('components/layouts/LoginLayout'));
const AdminLayout = lazy(() => import('components/layouts/AdminLayout'));

type SecurableRouteWithName = Omit<SecurableRoute, 'children'> & {
  children?: SecurableRouteWithName[];
  routeName?: string;
};

const routes: SecurableRouteWithName[] = [
  {
    index: true,
    element: (
      <Suspense fallback={<LoadingLayout />}>
        <RedirectionLayout />
      </Suspense>
    ),
  },
  {
    path: 'login',
    element: (
      <Suspense fallback={<LoadingLayout />}>
        <LoginLayout />
      </Suspense>
    ),
  },
  {
    path: 'admin',
    element: (
      <Suspense fallback={<LoadingLayout />}>
        <AdminLayout />
      </Suspense>
    ),
  },
];

export default routes;
