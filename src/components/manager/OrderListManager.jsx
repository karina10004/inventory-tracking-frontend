import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Dashboard_home";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Employee from "./inventoryofproducts";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PageviewIcon from "@mui/icons-material/Pageview";

function OrderListManager() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(
      "http://localhost:8080/api/v1/orders/order/manager",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resJson = await res.json();
    console.log(resJson);
    if (res.status === 200) {
      setOrders(resJson);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container-fluid">
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
              <Link to="/inventory" style={{ textDecoration: "none" }}>
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
              <Link to="/addproducts" style={{ textDecoration: "none" }}>
                <li>
                  <i className="fs-4 bi-plus-circle"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Addproducts</span>
                </li>
              </Link>
              <Link to="/notification" style={{ textDecoration: "none" }}>
                <li>
                  <NotificationsActiveIcon />{" "}
                  <span className="ms-1 d-none d-sm-inline">Notifications</span>
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
          <div>
            {/* List of admin  */}
            <div className="mt-4 px-5 pt-3">
              <h3>Orders</h3>
              <h4>Pending</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Ammount</th>
                    <th>Date</th>
                    {/* <th>Status</th> */}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{order.order_id}</td>
                        <td>{order.total_ammount}</td>
                        <td>{order.order_date.split("T")[0]}</td>
                        {/* <td>{status[order.status_id]}</td> */}
                        <td>
                          {/* <Link
                            to={{
                              pathname: `/order/${order.order_id}`,
                            }}
                          > */}
                          <button>
                            <PageviewIcon></PageviewIcon>
                          </button>
                          {/* </Link> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderListManager;
