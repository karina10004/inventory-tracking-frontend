import React from "react";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PageviewIcon from "@mui/icons-material/Pageview";
// import PageviewIcon from '@mui/icons-material/Pageview';
import { Link } from "react-router-dom";
import CustomerMenu from "./CustomerMenu";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState({});
  const [url, setUrl] = useState("");
  const getOrders = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/orders/order/customer",
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

  const handleInvoiceGeneration = async (order_id) => {
    const res = await fetch(
      `https://inventory-tracking.onrender.com/api/v1/orders/order/invoice/${order_id}`
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    setUrl(url);

    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${order_id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  useEffect(() => {
    getOrders();
    setStatus((prevStatus) => ({
      ...prevStatus,
      [1]: "pending",
      [2]: "manager-confirmation",
      [3]: "shipped",
      [4]: "delivered",
    }));
  }, []);
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <CustomerMenu></CustomerMenu>
        <div class="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Inventory Tracking System</h4>
          </div>
          <div>
            {/* List of admin  */}
            <div className="mt-4 px-5 pt-3">
              <h3>Orders</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Ammount</th>
                    <th>Date</th>
                    <th>Status</th>
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
                        <td>{status[order.status_id]}</td>
                        <td>
                          <Link
                            to={{
                              pathname: `/order/${order.order_id}`,
                            }}
                          >
                            <button>
                              <PageviewIcon></PageviewIcon>
                            </button>
                          </Link>
                          <button
                            onClick={() => {
                              handleInvoiceGeneration(order.order_id);
                            }}
                          >
                            <ReceiptIcon></ReceiptIcon>
                          </button>
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

export default Orders;
