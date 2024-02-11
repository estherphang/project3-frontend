import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userFirstName, setUserFirstName] = useState(
    localStorage.getItem("userFirstName") || ""
  );
  const [userLastName, setUserLastName] = useState(
    localStorage.getItem("userLastName") || ""
  );
  const [userImage, setUserImage] = useState(
    localStorage.getItem("userImage") || ""
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || ""
  );

  const handleUserLogout = () => {
    setUserFirstName("");
    setUserLastName("");
    setUserImage("");
    setUserEmail("");
    setUserRole("");

    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
  };

  useEffect(() => {
    localStorage.setItem("userFirstName", userFirstName);
    localStorage.setItem("userLastName", userLastName);
    localStorage.setItem("userImage", userImage);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userRole", userRole);
  }, [userFirstName, userLastName, userImage, userEmail, userRole]);

  return (
    <UserContext.Provider
      value={{
        userFirstName,
        setUserFirstName,
        userLastName,
        setUserLastName,
        userImage,
        setUserImage,
        userEmail,
        setUserEmail,
        userRole,
        setUserRole,
        handleUserLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the UserContext
export const useUser = () => useContext(UserContext);

//when user log in, use localstorage to store the users' main data. once's user log out, clear local storage, in case another user is using the same computer.
