import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../states/store";
import type { AppStore, RootState } from "../states/store";
import type { PreloadedState } from "@reduxjs/toolkit";

/**
 * RTL의 render의 기본 옵션을 extended 하여 정의된 interface
 * 사용자가 initialState, store 등의 다른 명세를 정의할 수 있도록 도와준다.
 * 향후, 테스트 정의시 react-router등을 등록할 수 있다.
 * 그때, <MemoryRouter />를 사용하면 편리할 것이다.
 */
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}> {children} </Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { renderWithProviders };
