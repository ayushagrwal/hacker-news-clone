import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  limit: 15,
  sort: 'new',
  query: '',
  posts: null,
  totalPages: null,
  currentPage: null
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
      state.page = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload.sort;
      state.page = 1;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload.totalPages;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
    setQuery: (state, action) => {
      state.query = action.payload.query;
      state.page = 1;
    }
  },
});

export const { nextPage, prevPage, setLimit, setPage, setSort, setPosts, setTotalPages, setCurrentPage, setQuery } = postSlice.actions;
export default postSlice.reducer;
