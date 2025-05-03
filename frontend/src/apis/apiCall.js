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

//Post apis
export const getPosts = (page, limit, sort) => {
    return axiosInstance({
      method: "GET",
      url: `/posts`,
      params: {
        page: page,
        limit: limit,
        sort: sort
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
        query: query
      },
    });
  };

export const getPostById = (id) => {
    return axiosInstance({
      method: "GET",
      url: `/posts/${id}`
    });
  };
