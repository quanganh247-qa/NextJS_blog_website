"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
// AuthProviderProps is a TypeScript type that describes the shape of the AuthProvider component's props
type AuthProviderProps = {
  children: React.ReactNode;
};
// AuthContextType is a TypeScript type that describes the shape of the AuthContext
type AuthContextType = {
  token: string | null;
  auth: boolean;
  setAuth: (auth: boolean) => void;
  setToken: (token: string) => void;
};
// AuthContext is a React context that provides the user's token to its children
export const AuthContext = React.createContext<AuthContextType>({
  token: null,
  auth: false,
  setAuth: () => {},
  setToken: () => {},
});

// AuthProvider is a React component that provides the user's token to its children
const AuthProvider = ({ children }: AuthProviderProps) => {
  // The token is stored in the browser's local storage
  const [token, setToken] = React.useState<string | null>(null);
  // The auth state is used to determine if the user is authenticated
  const [auth, setAuth] = React.useState<boolean>(false);

  // The token is retrieved from the browser's local storage when the component mounts
  React.useEffect(() => {
    // The token is retrieved from the browser's local storage
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setAuth(true);
    }
  }, [auth, token]);

  return (
    // The AuthContext.Provider component provides the user's token to its children
    <AuthContext.Provider
      value={{
        token,
        auth,
        setAuth,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth is a custom React hook that returns the user's token
const useAuth = (): AuthContextType => {
  // The token is stored in the browser's local storage
  const auth = React.useContext(AuthContext);

  // const router = useRouter();
  // if (!auth.auth) {
  //   router.push("/sign-in");
  // }

  return auth;
};

export { AuthProvider, useAuth };
