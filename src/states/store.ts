import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice'
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import { combineReducers } from 'redux';

import logger from 'redux-logger';
import { todosApi } from '../features/todos/todosApi';
import { pokemonApi } from '../services/pokemon';


// const middleware = [logger];

// 여러 reducer를 하나로 함쳐주는 역할을 하는 combineReducers
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  posts: postsReducer,
  users: usersReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer
})

// export const store = configureStore({
//   reducer,
//   // middleware: [thunks, logger]
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
//     .concat(logger)
//     .concat(pokemonApi.middleware)
// });

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(logger),
    preloadedState
  })
}

// setupListeners(store.dispatch())

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


/**
 * defaultMiddleware는 개발자들이 자주하는 실수를 최대한 줄여주기위해 기본적으로 필요한 미들웨어를 반환한다.
 * 기본적으로 다음과 같은 value를 반환한다.
 * const middleware = [thunk, immutableStateInvariant, serializableStateInvariant]
 * 더 자세한 사항은 아래 링크를 참고한다.
 * https://redux-toolkit.js.org/api/getDefaultMiddleware
 *  */