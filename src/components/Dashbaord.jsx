import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
const Dashboard = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Home />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
