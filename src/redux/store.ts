import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice'
import postsReducer from '../features/posts/postsSlice'
import {combineReducers} from 'redux';

const reducer = combineReducers({
  counter: counterReducer,
  todos:todosReducer,
  posts:postsReducer
})

export const store = configureStore({
  reducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
