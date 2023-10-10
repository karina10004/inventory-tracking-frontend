import React from "react";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerMenu from "./CustomerMenu";
function Order() {
  const [order, setOrder] = useState({});
  const [items, setItems] = useState([]);
  const [manager, setManager] = useState({});
  const [status, setStatus] = useState({});
  const [productNames, setProductNames] = useState({});

  const getOrder = async () => {
    const url = window.location.href;
    const id = url.split("https://inventory-tracking.netlify.app/order/")[1];
    const res1 = await fetch(
      `https://inventory-tracking.onrender.com/api/v1/orders/order/${id}`,
      {
        method: "GET",
      }
    );
    const res1Json = await res1.json();
    setOrder(res1Json);
  };

  const getItems = async () => {
    const url = window.location.href;
    const id = url.split("https://inventory-tracking.netlify.app/order/")[1];
    const res1 = await fetch(
      `https://inventory-tracking.onrender.com/api/v1/orders/item/all/${id}`,
      {
        method: "GET",
      }
    );
    const res1Json = await res1.json();
    setItems(res1Json);
    // console.log(items);
  };

  const getManager = async () => {
    const manager_id = order.manager_id;
    const res2 = await fetch(
      `https://inventory-tracking.onrender.com/api/v1/user/id/${manager_id}`,
      {
        method: "GET",
      }
    );
    const res2Json = await res2.json();
    setManager(res2Json);
  };

  const getProductNames = async () => {
    items.map(async (item) => {
      const res = await fetch(
        `https://inventory-tracking.onrender.com/api/v1/product/name/${item.product_id}`,
        {
          method: "GET",
        }
      );
      const resJson = await res.json();
      setProductNames((prevNames) => ({
        ...prevNames,
        [item.product_id]: resJson,
      }));
    });
    console.log(productNames);
  };

  useEffect(() => {
    getOrder();
    getItems();
    setStatus((prevStatus) => ({
      ...prevStatus,
      [1]: "pending",
      [2]: "manager-confirmation",
      [3]: "shipped",
      [4]: "delivered",
    }));

    // getManager();
  }, []);

  useEffect(() => {
    getProductNames();
    // getManager();
  }, [items]);

  useEffect(() => {
    if (Object.keys(order).length > 0) {
      getManager();
    }
  }, [order]);

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
              {/* <h3>Order</h3> */}
              <h6>OrderID: {order.order_id}</h6>
              <h6>Ammount: {order.total_ammount}</h6>
              <h6>Placed to: {manager.fullname}</h6>
              <h6>Date: {order.order_date}</h6>
              <h6>Status: {status[order.status_id]}</h6>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price per unit</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.product_id}</td>
                        <td>{productNames[item.product_id]}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price_per_unit}</td>
                        <td>{item.subtotal}</td>
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

export default Order;
