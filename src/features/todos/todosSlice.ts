import {createSlice} from '@reduxjs/toolkit';

interface TodosState {
  items: Array<TodoItem>
}

export interface TodoItem {
  id:string,
  task:string
}

const initialState: TodosState = {
  items:[]
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers:{
    addTodo(state, { payload }) {
      state.items.push(payload);
    },
    deleteTodo(state, {payload}) {
      state.items = state.items.filter(({id}) => id !== payload);
      // const index = state.items.findIndex(todo => todo.id === payload.id)
      // console.log("index:",index);
      
      // state.items.slice(index,1);
    }
  }
})

export const {
  addTodo,
  deleteTodo
} = todosSlice.actions;

export default todosSlice.reducer;