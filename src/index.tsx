import ReactDOM from 'react-dom/client';

import reportWebVitals from 'reportWebVitals';

import App from '@astarx-studio/react-core/app';
import { HelloWorldErrorPage } from '@astarx-studio/mui/prefabs/errors';

import routes from 'pages/_routes';

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);
root.render(
  <App
    strict
    routed={{
      routes,
      welcomePage: <HelloWorldErrorPage />,
    }}
    secured
  />
);

reportWebVitals();
