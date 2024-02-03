import "./App.css";
import LandingPage from "./LandingPage.jsx";
import UserCategory from "./UserCategory.jsx";
// import TalDashboard from "./Components/Talent/TalDashboard.jsx";
import EmDashboard from "./Components/Employer/EmDashboard.jsx";
import TalAppStatus from "./Components/Talent/TalAppStatus.jsx";
import TalDashboard from "./Components/Talent/TalDashboard.jsx";
import EmProfile from "./Components/Employer/EmProfile.jsx";
import EmJobLists from "./Components/Employer/EmJobLists.jsx";
import TalProfile from "./Components/Talent/TalProfile.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./NavBar.jsx";

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
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      {/* <Sample /> */}
    </>
  );
}

export default App;
