import React from "react";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import AddIcon from "@mui/icons-material/Add";
// import PageviewIcon from "@mui/icons-material/Pageview";
import { Link } from "react-router-dom";
function Order() {
  const [order, setOrder] = useState({});
  const [items, setItems] = useState([]);
  const [manager, setManager] = useState({});
  const [status, setStatus] = useState({});
  const [productNames, setProductNames] = useState({});

  const getOrder = async () => {
    const url = window.location.href;
    const id = url.split("http://localhost:3000/order/")[1];
    const res1 = await fetch(
      `http://localhost:8080/api/v1/orders/order/${id}`,
      {
        method: "GET",
      }
    );
    const res1Json = await res1.json();
    setOrder(res1Json);
  };

  const getItems = async () => {
    const url = window.location.href;
    const id = url.split("http://localhost:3000/order/")[1];
    const res1 = await fetch(
      `http://localhost:8080/api/v1/orders/item/all/${id}`,
      {
        method: "GET",
      }
    );
    const res1Json = await res1.json();
    setItems(res1Json);
    console.log(items);
  };

  const getManager = async () => {
    const manager_id = order.manager_id;
    const res2 = await fetch(
      `http://localhost:8080/api/v1/user/id/${manager_id}`,
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
        `http://localhost:8080/api/v1/product/name/${item.product_id}`,
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
      [2]: "shipped",
      [3]: "delivered",
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
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/manager/dashboard"
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
              <Link to="/placeorder" style={{ textDecoration: "none" }}>
                <li>
                  <i className="fs-4 bi-plus-circle"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Place Order</span>
                </li>
              </Link>
              <li>
                <a className="nav-link px-0 align-middle text-white">
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
