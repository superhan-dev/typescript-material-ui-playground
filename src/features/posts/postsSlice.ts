import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../states/store';
import { TodosState } from '../todos/todosSlice';

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string
}

export interface PostsState {
  items: Array<Post>,
  status?: string
}

interface PostParams {
  limit: number
}

const initialState: PostsState = {
  items: [],
  status: undefined
}

export const getPosts = createAsyncThunk<
  PostsState,
  PostParams,
  {
    dispatch: AppDispatch
    state: TodosState,
    // extra:
  }>(
    'posts/getPosts',
    async ({ limit }, { dispatch, getState }) => {
      // const todos = getState();
      // console.log({todos});
      return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
        .then((res) => res.json())
      // .then(() => dispatch())
    })

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.status = 'loading'
    })

    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.items = payload.items;
      state.status = 'success';
    })

    builder.addCase(getPosts.rejected, (state, action) => {
      state.status = 'failed'
    })
  }
})

export default postsSlice.reducer