import axiosInstance from "./axiosInterceptor";

//Auth apis
export const login = (values) => {
  return axiosInstance({
    method: "POST",
    url: `/auth/login`,
    data: values,
  });
};

export const register = (values) => {
  return axiosInstance({
    method: "POST",
    url: `/auth/register`,
    data: values,
  });
};

export const getUserById = (id) => {
  return axiosInstance({
    method: "GET",
    url: `/auth/user/${id}`,
  });
};

//Post apis
export const getPosts = (page, limit, sort) => {
  return axiosInstance({
    method: "GET",
    url: `/posts`,
    params: {
      page: page,
      limit: limit,
      sort: sort,
    },
  });
};

export const searchPosts = (page, limit, query) => {
  return axiosInstance({
    method: "GET",
    url: `/posts/search`,
    params: {
      page: page,
      limit: limit,
      query: query,
    },
  });
};

export const getPostById = (id) => {
  return axiosInstance({
    method: "GET",
    url: `/posts/${id}`,
  });
};

export const createPost = (values) => {
  return axiosInstance({
    method: "POST",
    url: `/posts`,
    data: values,
  });
};

export const updatePost = (values, id) => {
  return axiosInstance({
    method: "PUT",
    url: `/posts/${id}`,
    data: values,
  });
};

export const deletePost = (id) => {
  return axiosInstance({
    method: "DELETE",
    url: `/posts/${id}`,
  });
};

export const checkUserVoted = (postId) => {
  return axiosInstance({
    method: "GET",
    url: `/posts/${postId}/check-vote`,
  });
};

export const votePost = (value, id) => {
  return axiosInstance({
    method: "POST",
    url: `/posts/${id}/vote`,
    data: value,
  });
};

export const getPostComments = (postId) => {
  return axiosInstance({
    method: "GET",
    url: `/comments/post/${postId}`,
  });
};

export const getCommentReplies = (commentId) => {
  return axiosInstance({
    method: "GET",
    url: `/comments/${commentId}/replies`,
  });
};

export const createComment = (values) => {
  return axiosInstance({
    method: "POST",
    url: `/comments`,
    data: values,
  });
};

export const updateComment = (values, id) => {
  return axiosInstance({
    method: "PUT",
    url: `/comments/${id}`,
    data: values,
  });
};

export const deleteComment = (id) => {
  return axiosInstance({
    method: "DELETE",
    url: `/comments/${id}`,
  });
};
