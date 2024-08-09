import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { isLoggedIn } from "../utils/Auth";

interface AuthState {
  isAuthenticated: boolean;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });

  useEffect(() => {
    const fetchUser = async () => {
      const loggedIn = await isLoggedIn();
      setAuth({ isAuthenticated: loggedIn });
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
