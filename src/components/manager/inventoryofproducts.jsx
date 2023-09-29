import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SystemUpdateAltSharpIcon from "@mui/icons-material/SystemUpdateAltSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";

function Inventory() {
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://localhost:8080/api/v1/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const resJson = await res.json();
    console.log(resJson);
    setData(resJson);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
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
            {/* <Home></Home> */}
            <div className="px-5 py-3">
              <div className="d-flex justify-content-center mt-2">
                <h3>Product List</h3>
              </div>
              <div className="mt-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Description</th>
                      <th></th>
                      {/* <th>orders</th>
              <th>Sales</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((products, index) => {
                      return (
                        <tr key={index}>
                          <td>{products.product_name}</td>
                          <td>{products.price}</td>
                          <td>{products.quantity}</td>
                          <td>{products.description}</td>
                          <td>
                            <Link
                              to={{
                                pathname: `/update/product/${products.product_id}`,
                              }}
                            >
                              <SystemUpdateAltSharpIcon></SystemUpdateAltSharpIcon>
                            </Link>
                            <DeleteOutlineSharpIcon></DeleteOutlineSharpIcon>
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
    </div>
  );
}

export default Inventory;
