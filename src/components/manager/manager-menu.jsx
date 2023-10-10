import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "../manager/Dashboard_home";
import { Link } from "react-router-dom/cjs/react-router-dom";
// import Employee from "../manager/inventoryofproducts";]
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ManIcon from "@mui/icons-material/Man";

function Managermenu() {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/manager/dashboard"
          className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 fw-bolder d-none d-sm-inline">
            Admin Dashboard
          </span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <i className="fs-4 bi-speedometer2"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Dashboard</span>
          </li>
          <Link to="/inventory" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4 bi-people"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">View inventory</span>
            </li>
          </Link>
          <li>
            <i className="fs-4 bi-person"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Profile</span>
          </li>
          <Link to="/addproducts" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4 bi-plus-circle"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Addproducts</span>
            </li>
          </Link>
          <Link to="/manager/notification" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4">
                <NotificationsActiveIcon></NotificationsActiveIcon>{" "}
              </i>
              <span className="ms-1 d-none d-sm-inline">Notifications</span>
            </li>
          </Link>
          <Link to="/adddeliveryman" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4">
                <ManIcon></ManIcon>{" "}
              </i>
              <span className="ms-1 d-none d-sm-inline">
                Register Delivery Man
              </span>
            </li>
          </Link>
          <Link to="/shiporders" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4 bi-truck"> </i>{" "}
              <span className="ms-1 d-none d-sm-inline">Ship Orders</span>
            </li>
          </Link>
          <Link to="/manager/orders" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4 bi-list-ul"> </i>{" "}
              <span className="ms-1 d-none d-sm-inline">Orders</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4 bi-power"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Managermenu;
