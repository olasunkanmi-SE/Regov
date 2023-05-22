import { createContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Login, Register } from "../apis/usersApi";
import { ICreateUser, IUser } from "../interfaces/user.interface";
import { clearStorage, getDecryptedLocalStorage, setEncryptedLocalStorage } from "../utility/utility";
import { useNavigate } from "react-router-dom";

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

export type AuthenticationProps = {
  currentUser: IUser;
  signUp: (user: ICreateUser) => void;
  login: (user: Omit<ICreateUser, "userName">) => void;
  error: any;
  isAuthenticated: boolean;
  logOut: () => void;
};
export const AuthContext = createContext({} as AuthenticationProps);

export const AuthProvider = ({ children }: AuthenticationProviderProps) => {
  const storedUser = getDecryptedLocalStorage("user", true);

  const [currentUser, setCurrentUser] = useState<IUser>(storedUser ? JSON.parse(storedUser) : {});

  const [error, setError] = useState<any>();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const getCurrentUser = getDecryptedLocalStorage("user", true);
    if (getCurrentUser) {
      const savedUser = JSON.parse(getCurrentUser);
      if (Object.keys(savedUser).length) {
        setCurrentUser(savedUser);
      }
      if (currentUser) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries("users");
      setCurrentUser(data);
      if (currentUser) {
        setIsAuthenticated(true);
        clearStorage();
        setEncryptedLocalStorage("user", JSON.stringify(data), true);
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
