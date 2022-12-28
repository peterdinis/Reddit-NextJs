import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth} from "../firebase/init";
import nookies from "nookies";
import { User } from "firebase/auth";

const useAuth = () => {
  const [user] = useAuthState(auth);

  React.useEffect(() => {

    user ? setUserCookie(user) : nookies.set(undefined, "token", "");
  }, [user]);

  const setUserCookie = async (user: User) => {
    const token = await user.getIdToken();
    nookies.set(undefined, "token", token);
  };
};
export default useAuth;