import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SystemUpdateAltSharpIcon from "@mui/icons-material/SystemUpdateAltSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import Managermenu from "./manager-menu";

function Inventory() {
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/product",
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Managermenu></Managermenu>
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
