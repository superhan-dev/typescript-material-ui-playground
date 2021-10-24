import todosReducer,{TodosState,addTodo,deleteTodo} from './todosSlice';

describe('add todos',()=>{
  const initialState: TodosState = {
    items:[]
  };

  it('add hello to todos items', () => {
    const actual = todosReducer(initialState, addTodo({task:"Hello"}));
    expect(actual.items[0].task).toEqual("Hello");
  })

  it('delete todos items', () => {
    let actual = todosReducer(initialState, addTodo({task:"Hello"}));
    const addedTodo = actual.items.find(item => item.task === "Hello");
    
    actual = todosReducer(initialState, deleteTodo(addedTodo?.id));
    expect(actual.items.length).toEqual(0);
  })
})