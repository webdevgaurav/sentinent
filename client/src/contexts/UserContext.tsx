import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../../config";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext({});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userInfo, setUserInfo] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const [isUserUpdated, setIsUserUpdated] = useState<boolean>(false);

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      fetch(`${BASE_URL}/users/get/${user.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          user = data;
          setIsUserLoggedIn(true);
          setUserInfo(user);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) => {
          throw error;
        });
    }
  }, []);

  const updateUserInfo = (user: any) => {
    fetch(`${BASE_URL}/users/create/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
        localStorage.setItem("user", JSON.stringify(data));
        setIsUserUpdated(true);
        setTimeout(() => {
          setIsUserUpdated(false);
        }, 2000);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <UserContext.Provider
      value={{ userInfo, updateUserInfo, isUserLoggedIn, isUserUpdated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
