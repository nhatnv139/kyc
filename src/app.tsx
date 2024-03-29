import React from 'react';
import { Amplify } from 'aws-amplify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import '@aws-amplify/ui-react/styles.css';
import { Liveness } from './pages/liveness';
import { CONFIG } from './config/config';

Amplify.configure({
  aws_project_region: CONFIG.VITE_AWS_PROJECT_REGION,
  // @ts-ignore
  aws_cognito_identity_pool_id: CONFIG.VITE_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: CONFIG.VITE_AWS_COGNITO_REGION,
});

let router = createBrowserRouter([
  {
    path: '/liveness',
    loader: () => ({ message: 'Hello Data Router!' }),
    Component: Liveness,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
