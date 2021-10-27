import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

type User = { id: string, email: string, name: string, articles: Array<Article>, comments: Array<Comment> };
type Article = { id: string, paragraphs: string, image: string, userId: string };
type Comment = { id: string, paragraph: string, userId: string };

export const fetchData = createAsyncThunk('users/fetchData', async (_, { dispatch }) => {
  const data = await fetch('http://localhost:3001/users').then(res => res.json())
  const users = data.map(({ articles, comments, ...user }: User) => ({
    ...user,
    articles: articles.map(({ id }: { id: string }) => id),
    comments: comments.map(({ id }: { id: string }) => id),
  }))
  dispatch(setUsers(data));

  const articles = data.map((user: User) =>
    user.articles
      .map((article: Article) => ({ ...article, userId: user.id })))
    .flat();

  const comments = data.map((user: User) =>
    user.comments
      .map((comment: Comment) => ({ ...comment, userId: user.id })))
    .flat();

})

const usersAdapter = createEntityAdapter<User>({
  selectId: ({ id }: { id: string }) => id,
})


const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addUser: usersAdapter.addOne,
    setUsers: usersAdapter.setAll,
    addUsers: usersAdapter.addMany
  }
})

export const { addUser, setUsers, addUsers } = usersSlice.actions;

export default usersSlice.reducer;