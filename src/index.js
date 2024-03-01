import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { Navigate } from "react-router-dom";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from './routes/Auth/Auth';
import MatchSettings from './routes/MatchSettings/MatchSettings';
import PreviousMatches from './routes/PreviousMatches/PreviousMatches';
import MatchOperator from './routes/MatchOperator/MatchOperator';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      { localStorage.getItem('token')
        ?<Navigate to="/new-match" replace={true} />
        :<Auth />
      }
      </>
    ),
  },
  {
    path: '/new-match',
    element: <MatchSettings />
  },
  {
    path: '/previous-matches',
    element: <PreviousMatches />
  },
  {
    path: '/match-operator',
    element: <MatchOperator />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
