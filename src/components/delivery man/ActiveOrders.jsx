import React, { useState, useEffect } from "react";
import DeliveryManDashboardMenu from "./DeliveryManDashboardMenu";

const ActiveOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("access_token");

  const getActiveOrders = async () => {
    const res1 = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/orders/order/delivery/3",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res1Json = await res1.json();
    setOrders(res1Json);
  };

  const handleDeliveredOrder = async (order_id) => {
    const res2 = await fetch(
      `https://inventory-tracking.onrender.com/api/v1/orders/order/status/${order_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status_id: 4,
        }),
      }
    );

    getActiveOrders();
    console.log(orders.length);
    if (orders.length == 1) {
      const dm_id = 0;
      const res3 = await fetch(
        `https://inventory-tracking.onrender.com/api/v1/delivery/availability/${dm_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            availability: true,
          }),
        }
      );
    }
  };

  useEffect(() => {
    getActiveOrders();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <DeliveryManDashboardMenu></DeliveryManDashboardMenu>
          <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
              <h4>Inventory Tracking System</h4>
            </div>

            {/* List of admin  */}
            <div className="mt-4 px-5 pt-3">
              <h3>Orders</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Ammount</th>
                    <th>Date</th>
                    <th>Mark as Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{order.order_id}</td>
                        <td>{order.total_ammount}</td>
                        <td>{order.order_date.split("T")[0]}</td>
                        <td>
                          <button
                            onClick={() => {
                              handleDeliveredOrder(order.order_id);
                            }}
                          >
                            <i class="bi bi-check-circle-fill"></i>
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
};

export default ActiveOrders;
