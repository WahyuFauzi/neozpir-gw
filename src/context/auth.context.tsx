import { createSignal, onMount } from "solid-js";
import { createContext, useContext } from "solid-js";
import AuthService from "../service/auth.service";

const AuthContext = createContext();

interface IAuth {
  session: Object | null,
  providedToken: string | null
}

export function AuthProvider(props: any) {
  const [auth, setAuth] = createSignal({ session: null, providedToken: null } as IAuth);
  const authService = new AuthService();

  onMount(async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        const jwt = await authService.getJwt();
        setAuth({ session: user, providedToken: jwt });
      }
    } catch (error) {
      console.error("Error initializing auth context:", error);
      setAuth({ session: null, providedToken: null });
    }
  });

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
