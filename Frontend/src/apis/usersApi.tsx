import axios from "axios";
import { QueryObserverResult, useQuery } from "react-query";
import { baseURL } from "../constants";
import { ICreateUser, IUserResponse, IUsersResponse } from "../interfaces/user.interface";

const userApi = axios.create({
  baseURL: baseURL,
});

export const GetUsers = async (): Promise<IUsersResponse> => {
  const response = await userApi.get("/users");
  return response.data.data;
};

export const Register = async (user: ICreateUser): Promise<IUserResponse> => {
  const response = await userApi.post("/users", user, { withCredentials: false });
  return response.data.data;
};

export const Login = async (user: Omit<ICreateUser, "userName">): Promise<IUserResponse> => {
  const response = await userApi.post("/users", user);
  return response.data.data;
};

const QueryUserItem = async (id: string): Promise<IUserResponse> => {
  const response = await userApi.get(`/Users/${id}`);
  return response.data.data;
};

export const GetUserById = (id: string): QueryObserverResult<IUserResponse> => {
  return useQuery<IUserResponse, Error>(["user", id], async () => QueryUserItem(id), {
    staleTime: 1000000,
    cacheTime: 1000000,
    onSuccess: (res) => {
      return {
        data: res.data,
        isSuccess: res.success,
      };
    },
    onError: (err) => {
      return err.message;
    },
  });
};
