import { useEffect } from "react";
import { axiosPrivate } from "../apis/axios";
import { useAuth } from "./useAuth";

export const useAxiosPrivate = () => {
  const { currentUser, logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${currentUser?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          logOut();
        }
        if (error.response.status === 403) {
          logOut();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser]);
  return axiosPrivate;
};

export default useAxiosPrivate;
