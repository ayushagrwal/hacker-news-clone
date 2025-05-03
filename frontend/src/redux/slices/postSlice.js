import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  limit: 10,
  sort: 'new',
  query: '',
  posts: null
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    prevPage: (state) => {
      state.page = state.page - 1;
    },
    setPage: (state, action) => {
      state.page = action.payload.pageNo;
    },
    setLimit: (state, action) => {
      state.limit = action.payload.limit;
    },
    setSort: (state, action) => {
      state.sort = action.payload.sort;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setQuery: (state, action) => {
      state.query = action.payload.query;
      state.page = 1;
    }
  },
});

export const { nextPage, prevPage, setLimit, setPage, setSort, setPosts, setQuery } = postSlice.actions;
export default postSlice.reducer;
