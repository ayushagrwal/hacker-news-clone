import axiosInstance from "./axiosInterceptor";

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