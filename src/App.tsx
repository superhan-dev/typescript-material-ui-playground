import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { CounterLayout } from "./views/counter";
import { MainLayout, MainView } from "./views/main";
import { PageNotFoundView } from "./views/PageNotFoundView";
import { TodosLayout } from "./views/todos";

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <MainView /> },
      { path: "404", element: <PageNotFoundView /> },
      // { path: "account", element: <Navigate to="/account/list" /> },
    ],
  };

  const todosRoutes = {
    path: "todos",
    element: <TodosLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      // { path: ":id", element: <AccountDetailView /> },
      // { path: "add", element: <AccountAddView /> },
      // { path: "list", element: <AccountListView /> },
    ],
  };
  const conterRoutes = {
    path: "counter",
    element: <CounterLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      // { path: ":id", element: <AccountDetailView /> },
      // { path: "add", element: <AccountAddView /> },
      // { path: "list", element: <AccountListView /> },
    ],
  };

  const routing = useRoutes([mainRoutes, todosRoutes, conterRoutes]);

  return <>{routing}</>;
};

export default App;
