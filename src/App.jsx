import "./App.css";
import Sample from "./Sample.jsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import UserCategory from "./UserCategory.jsx";
// import TalDashboard from "./Components/Talent/TalDashboard.jsx";
import EmDashboard from "./Components/Employer/EmDashboard.jsx";
import TalAppStatus from "./Components/Talent/TalAppStatus.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import TalDashboard from "./Components/Talent/TalDashboard.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<LandingPage />} />
        <Route path="user-category" element={<UserCategory />} />
        <Route path="talent" element={<TalDashboard />} />
        <Route path="talent/application" element={<TalAppStatus />} />
        <Route path="employer" element={<EmDashboard />} />
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
