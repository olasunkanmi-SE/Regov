import { useContext } from "react";
import { AuthContext, AuthenticationProps } from "../contexts/AuthContext";

export const useAuth = (): AuthenticationProps => {
  return useContext(AuthContext);
};
