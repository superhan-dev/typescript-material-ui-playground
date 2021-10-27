import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PageNotFoundView } from "./views/PageNotFoundView";

import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import { MainLayout } from "./layouts/main/MainLayout";
import { Todos } from "./views/Todos";
import { Counter } from "./views/Counter";

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "404", element: <PageNotFoundView /> },
      { path: "/", element: <Navigate to="/app/todos" /> },
    ],
  };

  const appRoutes = {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "todos", element: <Todos /> },
      { path: "counter", element: <Counter /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  };

  const routing = useRoutes([mainRoutes, appRoutes]);

  return <>{routing}</>;
};

export default App;
