import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Inventory from "../components/manager/inventoryofproducts";
import Addproducts from "../components/manager/Addproducts";
import Updateproduct from "../components/manager/UpdateProduct";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../components/manager/Dashboard_home";

const Manager = () => {
  return (
    <div className="container-fluid">
      <Router>
        <div className="row flex-nowrap">
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
                <Link
                  to="/manager/dashboard/inventory"
                  style={{ textDecoration: "none" }}
                >
                  <li>
                    <i className="fs-4 bi-people"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">
                      View inventory
                    </span>
                  </li>
                </Link>
                <li>
                  <i className="fs-4 bi-person"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Profile</span>
                </li>
                <Link
                  to="/manager/dashboard/addproducts"
                  style={{ textDecoration: "none" }}
                >
                  <li>
                    <i className="fs-4 bi-plus-circle"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Addproducts</span>
                  </li>
                </Link>
                <Link to="/notification" style={{ textDecoration: "none" }}>
                  <li>
                    <span className="ms-1 d-none d-sm-inline">
                      <NotificationsActiveIcon />
                      Notifications
                    </span>
                  </li>
                </Link>
                <li>
                  <a href="#" className="nav-link px-0 align-middle text-white">
                    <i className="fs-4 bi-power"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
              <h4>Inventory Tracking System</h4>
            </div>
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/manager/dashboard/inventory">
                <Inventory></Inventory>
              </Route>
              <Route path="/addproducts">
                <Addproducts></Addproducts>
              </Route>
              <Route path="/update/product/:product_id">
                <Updateproduct></Updateproduct>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Manager;
