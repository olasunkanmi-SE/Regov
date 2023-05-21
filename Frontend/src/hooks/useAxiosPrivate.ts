import { useEffect } from "react";
import { axiosPrivate } from "../apis/axios";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
  const { currentUser, logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (request) => {
        if (!request.headers["Authorization"]) {
          request.headers["Authorization"] = `Bearer ${currentUser?.accessToken}`;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          logOut();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  });
  return axiosPrivate;
};

export default useAxiosPrivate;
