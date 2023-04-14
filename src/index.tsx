import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import NotFound from './components/NotFound';
import Error404 from './components/Error404';
import ProjectDetails from './components/ProjectDetails';
import reportWebVitals from './reportWebVitals';
import './index.css';

const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "404",
      element: <Error404 />,
    },
    {
      path: "projects/:platform/:org/:repo",
      element: <ProjectDetails />,
    },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
