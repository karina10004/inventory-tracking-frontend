import React from "react";
import { useState, useEffect } from "react";
import CustomerMenu from "./CustomerMenu";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
function Manager() {
  const [managers, setManagers] = useState([]);

  const getManagers = async () => {
    const res = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/user/managers"
    );
    const resJson = await res.json();
    setManagers(resJson);
  };

  useEffect(() => {
    getManagers();
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
              <h3>List of Managers</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Place Order</th>
                  </tr>
                </thead>
                <tbody>
                  {managers.map((manager, index) => {
                    return (
                      <tr key={index}>
                        <td>{manager.user_name}</td>
                        <td>{manager.address}</td>
                        <td>
                          <Link
                            to={{
                              pathname: `/products/${manager.user_name}`,
                            }}
                          >
                            <AddIcon></AddIcon>
                          </Link>
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

export default Manager;
