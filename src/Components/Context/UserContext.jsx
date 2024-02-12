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
  const [userID, setUserID] = useState(localStorage.getItem("userID") || "");

  const handleUserLogout = () => {
    setUserFirstName("");
    setUserLastName("");
    setUserImage("");
    setUserEmail("");
    setUserRole("");
    setUserID("");

    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    localStorage.removeItem("userImage");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userID");
  };

  useEffect(() => {
    localStorage.setItem("userFirstName", userFirstName);
    localStorage.setItem("userLastName", userLastName);
    localStorage.setItem("userImage", userImage);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userID", userID);
  }, [userFirstName, userLastName, userImage, userEmail, userRole, userID]);

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
        userID,
        setUserID,
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
