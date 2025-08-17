import { createSignal } from "solid-js";
import { createContext, useContext } from "solid-js";

const AuthContext = createContext();

interface IAuth {
  session: Object | null,
  providedToken: string | null
}

export function AuthProvider(props: any) {
  const [auth, setAuth] = createSignal({ session: null, providedToken: null } as IAuth);

  const store = {
    auth,
    setAuth 
  };

  return (
    <AuthContext.Provider value={store}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext) as any; // TS says: "Okay, returning unknown"
};
