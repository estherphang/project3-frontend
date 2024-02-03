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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<LandingPage />} />
        <Route path="user-category" element={<UserCategory />} />
        <Route path="talent" element={<TalDashboard />} />
        <Route path="talent/application" element={<TalAppStatus />} />
        <Route path="talent/profile" element={<TalProfile />} />
        <Route path="employer" element={<EmDashboard />} />
        <Route path="employer/profile" element={<EmProfile />} />
        <Route path="employer/joblistings" element={<EmJobLists />} />
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
