import { createSlice } from '@reduxjs/toolkit';

export interface TodosState {
  items: Array<TodoItem>
}

export interface TodoItem {
  id: string,
  task: string
}

const initialState: TodosState = {
  items: []
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, { payload }) {
      state.items.push(payload);
    },
    deleteTodo(state, { payload: todoId }) {
      state.items = state.items.filter(({ id }) => id !== todoId);
      // state.items.splice(index, 1)
    },
    patchTodo(state, { payload: { index, task } }) {
      state.items[index].task = task;
    }
  }
})

export const {
  addTodo,
  deleteTodo,
  patchTodo
} = todosSlice.actions;

export default todosSlice.reducer;