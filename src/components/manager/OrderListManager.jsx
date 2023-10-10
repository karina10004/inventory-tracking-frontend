import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./Dashboard_home";
// import { Link } from "react-router-dom/cjs/react-router-dom";
// import Employee from "./inventoryofproducts";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PageviewIcon from "@mui/icons-material/Pageview";
import Managermenu from "./manager-menu";

function OrderListManager() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/orders/order/manager",
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
        <Managermenu></Managermenu>
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
