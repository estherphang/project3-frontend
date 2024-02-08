import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";
import LandingPage from "./LandingPage.jsx";
import UserCategory from "./UserCategory.jsx";
import EmDashboard from "./Components/Employer/EmDashboard.jsx";
import TalAppStatus from "./Components/Talent/TalAppStatus.jsx";
import TalDashboard from "./Components/Talent/TalDashboard.jsx";
import EmProfile from "./Components/Employer/EmProfile.jsx";
import EmJobLists from "./Components/Employer/EmJobLists.jsx";
import TalProfile from "./Components/Talent/TalProfile.jsx";

import EmProfileCreation from "./Components/Employer/EmProfileCreation.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./NavBar.jsx";
import TalProfileSetting from "./Components/Talent/TalProfileSetting.jsx";
import Chat from "./Components/Chat/chat.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<LandingPage />} />
        <Route path="user-category" element={<UserCategory />} />
        <Route
          path="talent"
          element={
            <>
              <TalDashboard />
              <NavBar />
            </>
          }
        />
        <Route
          path="talent/applications"
          element={
            <>
              <TalAppStatus />
              <NavBar />
            </>
          }
        />
        <Route
          path="talent/profile"
          element={
            <>
              <TalProfile />
              <NavBar />
            </>
          }
        />
        <Route
          path="talent/profile/setting"
          element={
            <>
              <TalProfileSetting />
              <NavBar />
            </>
          }
        />
        <Route
          path="employer"
          element={
            <>
              <EmDashboard />
              <NavBar />
            </>
          }
        />
        <Route
          path="employer/profile"
          element={
            <>
              <EmProfile />
              <NavBar />
            </>
          }
        />
        <Route
          path="employer/applications"
          element={
            <>
              <EmJobLists />
              <NavBar />
            </>
          }
        />
        <Route
          path="chat"
          element={
            <>
              <Chat />
              <NavBar />
            </>
          }
        />

        <Route path="employer/sign-up" element={<EmProfileCreation />} />
      </Route>
    )
  );

  return (
    <>
      {" "}
      <Auth0Provider
        domain={import.meta.env.VITE_SOME_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_SOME_AUTH0_CLIENTID}
        authorizationParams={{
          redirect_uri: import.meta.env.VITE_SOME_AUTH0_REDIRECTURL,
          audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
          scope:
            //to incldue openid, profile and email.
            "read:current_user update:current_user_metadata openid profile email",
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
      {/* <Sample /> */}
    </>
  );
}

export default App;
