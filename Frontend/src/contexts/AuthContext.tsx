import { createContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Login, Register } from "../apis/usersApi";
import { ICreateUser, IUser } from "../interfaces/user.interface";
import { clearStorage, setEncryptedLocalStorage } from "../utility/utility";
import { useNavigate } from "react-router-dom";

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

export type AuthenticationProps = {
  currentUser: IUser | undefined;
  signUp: (user: ICreateUser) => void;
  login: (user: Omit<ICreateUser, "userName">) => void;
  error: any;
  isAuthenticated: boolean;
  logOut: () => void;
};
export const AuthContext = createContext({} as AuthenticationProps);

export const AuthProvider = ({ children }: AuthenticationProviderProps) => {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [error, setError] = useState<any>();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const signUpMutation = useMutation(Register, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      navigate("/login");
    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
  });
  const signUp = (user: ICreateUser) => {
    signUpMutation.mutate(user);
  };

  const loginMutation = useMutation(Login, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");
      setCurrentUser(data);
      if (currentUser) {
        setIsAuthenticated(true);
        const { accessToken, userName, ...others } = currentUser;
        others;
        setEncryptedLocalStorage("user", JSON.stringify({ accessToken, userName }), true);
        navigate("/");
      }
    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
  });
  const login = (user: Omit<ICreateUser, "userName">) => {
    loginMutation.mutate(user);
  };

  const logOut = () => {
    setCurrentUser(undefined);
    setIsAuthenticated(false);
    clearStorage();
    navigate("/login");
  };
  const value = {
    currentUser,
    signUp,
    error,
    login,
    isAuthenticated,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
