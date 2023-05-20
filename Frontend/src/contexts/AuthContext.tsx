import { createContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Register } from "../apis/usersApi";
import { ICreateUser, IUserResponse } from "../interfaces/user.interface";

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

export type AuthenticationProps = {
  currentUser: IUserResponse | undefined;
  signUp: (user: ICreateUser) => void;
  error: any;
};
export const AuthContext = createContext({} as AuthenticationProps);

export const AuthProvider = ({ children }: AuthenticationProviderProps) => {
  const [currentUser, setCurrentUser] = useState<IUserResponse>();
  const [error, setError] = useState<any>();
  const queryClient = useQueryClient();
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  const signUpMutation = useMutation(Register, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");
      setCurrentUser(data);
    },
    onError: (error) => {
      setError(error);
    },
  });
  const signUp = (user: ICreateUser) => {
    signUpMutation.mutate(user);
  };
  const value = {
    currentUser,
    signUp,
    error,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
