import React from "react";
import { Link } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const CustomerMenu = () => {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/user/home"
          className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 fw-bolder d-none d-sm-inline">
            User Dashboard
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
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4 bi-people"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">View orders</span>
            </li>
          </Link>
          <Link to="/userprofile" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4 bi-person"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Profile</span>
            </li>
          </Link>
          <Link to="#" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsActiveIcon className="fs-4" />
              {"  "}
              <span className="ms-1 d-none d-sm-inline">Notifications</span>
            </li>
          </Link>
          <Link to="/placeorder" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4 bi-plus-circle"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Place Order</span>
            </li>
          </Link>
          <Link to="/trackorder" style={{ textDecoration: "none" }}>
            <li>
              <i className="fs-4 bi bi-geo-alt"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Track Order</span>
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
};

export default CustomerMenu;
