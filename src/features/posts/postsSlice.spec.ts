import postsReducer, { PostsState } from './postsSlice';

describe('fetching posts', () => {
  const initialState: PostsState = {
    items: [],
    status: ""
  };
  it('post test ready', () => {
    expect(true).toEqual(true);
  })
  // const actual = postsReducer(initialState, getPosts({}))
})