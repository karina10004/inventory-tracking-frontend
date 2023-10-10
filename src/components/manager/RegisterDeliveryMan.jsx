import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
// import Home from "./Dashboard_home";
// import { Link } from "react-router-dom/cjs/react-router-dom";
// import Employee from "./inventoryofproducts";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Managermenu from "./manager-menu";

const RegitserDeliveryMan = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        "https://inventory-tracking.onrender.com/api/v1/delivery/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullname: name,
            phone: phone,
          }),
        }
      );
      if (res.status === 200) {
        history.push("/inventory");
      } else {
        console.log(res);
      }
    } catch (error) {}
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Managermenu></Managermenu>
        <div class="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Inventory Tracking System</h4>
          </div>
          <div className="d-flex flex-column align-items-center pt-4">
            <h3>Register a delivery man</h3>
            <form className="row g-3 w-50" onSubmit={handleSubmit}>
              <div className="col-12">
                <label htmlFor="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputPhone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  autoComplete="off"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add Delivery Man
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegitserDeliveryMan;
