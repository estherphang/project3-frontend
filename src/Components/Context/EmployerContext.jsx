import React, { createContext, useContext, useState } from "react";

const EmployerContext = createContext();
export const EmployerProvider = ({ children }) => {
  const [EmFormData, setEmFormData] = useState({
    companyName: "Default Company Name",
    description: "Default Company Description",
  });

  const [imgurl, setImageUrl] = useState("");
  //fileInputFile is a state containing the employer's profile image

  return (
    <EmployerContext.Provider
      value={{
        EmFormData,
        setEmFormData,
        imgurl,
        setImageUrl,
      }}
    >
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployer = () => useContext(EmployerContext);
