import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Dashboard_home";
// import { Link } from "react-router-dom/cjs/react-router-dom";
// import Employee from "./inventoryofproducts";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Managermenu from "../shit/manager-menu";

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Managermenu></Managermenu>
        <div class="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Inventory Tracking System</h4>
          </div>
          <Home></Home>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
