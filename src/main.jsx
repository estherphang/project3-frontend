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
