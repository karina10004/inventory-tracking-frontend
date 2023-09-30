import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";
// import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
function Productmanager() {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [isItem, setIsItem] = useState({});
  const history = useHistory();

  const getProducts = async () => {
    const url = window.location.href;
    const reqparam = url.split("http://localhost:3000/products/")[1];
    const token = localStorage.getItem("access_token");
    const res = await fetch(
      `http://localhost:8080/api/v1/product/user/${reqparam}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resJson = await res.json();
    console.log(resJson);
    setData(resJson);
  };

  const handleQuantityChange = async (product_id, newQuantity) => {
    if (newQuantity < 0) newQuantity = 0;
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [product_id]: newQuantity,
    }));
  };

  const handleDoneChange = async (product_id) => {
    if (quantity[product_id] > 0) {
      // console.log(product_id);
      setIsItem((prevItems) => ({
        ...prevItems,
        [product_id]: true,
      }));
    }
  };

  const handleDeleteChange = async (product_id) => {
    if (quantity[product_id] > 0) {
      // console.log(product_id);
      setIsItem((prevItems) => ({
        ...prevItems,
        [product_id]: false,
      }));
    }
  };

  const handlePlaceOrder = async () => {
    const url = window.location.href;

    const name = url.split("http://localhost:3000/products/")[1];
    let totalAmmount = 0;
    let order_id = 0;
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://localhost:8080/api/v1/orders/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        manager_name: name,
      }),
    });
    if (res.status === 200) {
      const resJson = await res.json();
      console.log(resJson);
      order_id = resJson[0].order_id;
      data.map(async (product) => {
        if (isItem[product.product_id] === true) {
          const res = await fetch(
            `http://localhost:8080/api/v1/orders/item/${resJson[0].order_id}/${product.product_id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                quantity: quantity[product.product_id],
              }),
            }
          );
          const res2Json = await res.json();
          totalAmmount = totalAmmount + res2Json;
          const res2 = await fetch(
            `http://localhost:8080/api/v1/orders/order/ammount/${order_id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                total_ammount: totalAmmount,
              }),
            }
          );
          await res2.json();
          history.push("/orders");
        }
      });
      console.log(totalAmmount);
    }
  };

  useEffect(() => {
    getProducts();
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
                <i className="fs-4 bi-power"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Logout</span>
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
              <h3>Products</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Cost per item</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((products, index) => {
                    if (isItem[products.product_id] === true) {
                      return <></>;
                    }
                    return (
                      <tr key={index}>
                        <td>{products.product_name}</td>
                        <td>{products.description}</td>
                        <td>{products.price}</td>
                        <td>
                          <button
                            onClick={() => {
                              const currQuantity =
                                quantity[products.product_id] || 0;
                              handleQuantityChange(
                                products.product_id,
                                currQuantity + 1
                              );
                            }}
                          >
                            <AddIcon></AddIcon>{" "}
                          </button>
                          <span> </span>
                          {quantity[products.product_id] || 0}
                          <span> </span>
                          <button
                            onClick={() => {
                              const currQuantity =
                                quantity[products.product_id] || 0;
                              handleQuantityChange(
                                products.product_id,
                                currQuantity - 1
                              );
                            }}
                          >
                            <RemoveIcon></RemoveIcon>
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handleDoneChange(products.product_id)
                            }
                          >
                            <DoneIcon></DoneIcon>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h3>Current Order</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Cost per item</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((products, index) => {
                    if (isItem[products.product_id] !== true) {
                      return <></>;
                    }
                    return (
                      <tr key={index}>
                        <td>{products.product_name}</td>
                        <td>{products.description}</td>
                        <td>{products.quantity}</td>
                        {/* <td>
                          <button
                            onClick={() => {
                              const currQuantity =
                                quantity[products.product_id] || 0;
                              handleQuantityChange(
                                products.product_id,
                                currQuantity + 1
                              );
                            }}
                          >
                            <AddIcon></AddIcon>{" "}
                          </button>
                          <span> </span>
                          {quantity[products.product_id] || 0}
                          <span> </span>
                          <button
                            onClick={() => {
                              const currQuantity =
                                quantity[products.product_id] || 0;
                              handleQuantityChange(
                                products.product_id,
                                currQuantity - 1
                              );
                            }}
                          >
                            <RemoveIcon></RemoveIcon>
                          </button>
                        </td> */}
                        <td>{quantity[products.product_id]}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleDeleteChange(products.product_id)
                            }
                          >
                            <DeleteOutlineIcon></DeleteOutlineIcon>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <button
                onClick={() => {
                  handlePlaceOrder();
                }}
              >
                place order
              </button>
              <button> cancel order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productmanager;
