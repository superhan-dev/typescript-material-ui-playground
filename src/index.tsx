import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@mui/styles";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

// import { todosApi } from "./features/todos/todosApi";

import { setupStore } from "./states/store";

const store = setupStore();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <ApiProvider api={todosApi}> */}
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      {/* </ApiProvider> */}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
