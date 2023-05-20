import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import NotFound from "./components/NotFound";
import CommonError from "./components/CommonError";
import ProjectDetails from "./components/ProjectDetails";
import ProjectComparator from "./components/ProjectCompartor";

import reportWebVitals from "./reportWebVitals";
import "./index.css";

const router = createHashRouter([
  {
    path: "*",
    element: <CommonError />,
  },
  {
    path: "404",
    element: <NotFound />,
  },
  {
    path: "projects/:platform/:org/:repo/compare/:prevCommitHash/:currentCommitHash",
    element: <ProjectComparator />,
  },
  {
    path: "projects/:platform/:org/:repo/commit/:commitHash",
    element: <ProjectDetails />,
  },
  {
    path: "projects/:platform/:org/:repo",
    element: <ProjectDetails />,
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
