import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getStrapiURL } from "../../lib/api";

export const AuthContext = createContext();
export const AuthContextLogin = createContext();
export const AuthContextLogout = createContext();

export const useAuth = () => useContext(AuthContext);
export const useAuthLogin = () => useContext(AuthContextLogin)
export const useAuthLogout = () => useContext(AuthContextLogout);

function AuthProvider({ children }) {
  const { pathname, events } = useRouter();
  const router = useRouter();
  const [user, setUser] = useState({});

  const updateUserLogin = async (username, password) => {
    const config = {
      method: 'post',
      url: `${getStrapiURL()}/auth/local`,
      data: {
        identifier: username,
        password: password,
      }
    }

    try {
      const userData = await axios(config)
      console.log(userData.data)
      setUser(userData.data)
      router.push("/")
    } catch (error) {
      // TODO: make this respond with an actuall error that the user can understand 
      console.error(error)
    }

  };

  const updateUserLogout = () => {
    router.push("/")
    setTimeout(() => {
      setUser({});
    }, 2000)
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(savedUser);
  }, []);

  useEffect(() => {
    // console.log('thisi s the useEffect inside of the user state')
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);


  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = (url) => {
      if (url !== "/" && JSON.stringify(user) === "{}") {
        console.log(url);
        console.log(user);
        console.log(
          "You are NOT on the home page and the user object is EMPTY"
        );
        router.push("/")
      }
    };

    // Check that initial route is OK
    if (pathname !== "/" && JSON.stringify(user) === "{}") {
      console.log(pathname);
      console.log(user);
      console.log("You are NOT on the home page and the user object is EMPTY");
      router.push("/")
    }

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={user}>
      <AuthContextLogout.Provider value={updateUserLogout}>
        <AuthContextLogin.Provider value={updateUserLogin}>
        {children}
        </AuthContextLogin.Provider>
      </AuthContextLogout.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
