import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./Components/Context/UserContext.jsx";
import { EmployerProvider } from "./Components/Context/EmployerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <EmployerProvider>
        <App />
      </EmployerProvider>
    </UserProvider>
  </React.StrictMode>
);

{
  /*Don't know how to use useContext to provide Employer related states only to all Employer related components 
  :( -Dana*/
}
