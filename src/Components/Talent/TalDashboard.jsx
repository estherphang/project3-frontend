import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function TalDashboard() {
  return (
    <div>
      Talent home/dashboard. See and swipe job listings
      <NavLink to="application">applications</NavLink>
      <Outlet />
    </div>
  );
}
