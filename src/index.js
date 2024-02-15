import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Counter } from './routes/Counter';
import Auth from './routes/Auth/Auth';
import MatchSettings from './routes/MatchSettings/MatchSettings';
import PreviousMatches from './routes/PreviousMatches/PreviousMatches';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: '/new-match',
    element: <MatchSettings />
  },
  {
    path: '/previous-matches',
    element: <PreviousMatches />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
