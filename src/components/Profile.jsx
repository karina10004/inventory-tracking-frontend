import React from "react";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Profile.css";
import { Link } from "react-router-dom";
function Profile() {
  const [user, setUser] = useState({});

  const getUser = async () => {
    const access_token = localStorage.getItem("access_token");
    const res = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/user/mid/user",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const resJson = await res.json();
    setUser(resJson);
  };

  useEffect(() => {
    getUser();
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
            <div className="student-profile py-4">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card shadow-sm">
                      <div className="card-header bg-transparent text-center">
                        <img
                          className="profile_img"
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          alt="student dp"
                        />
                        <h3>{user.fullname}</h3>
                      </div>
                      <div className="card-body">
                        <p className="mb-0">
                          <strong className="pr-1">Manager ID:</strong>
                          {user.user_id}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card shadow-sm">
                      <div cclassName="card-header bg-transparent border-0">
                        <h3 className="mb-0">
                          <i className="far fa-clone pr-1"></i>General
                          Information
                        </h3>
                      </div>
                      <div className="card-body pt-0">
                        <table className="table table-bordered">
                          <tr>
                            <th width="30%">Manager id</th>
                            <td width="2%">:</td>
                            <td>{user.user_id}</td>
                          </tr>
                          <tr>
                            <th width="30%">Date of joining</th>
                            <td width="2%">:</td>
                            <td>2023</td>
                          </tr>
                          <tr>
                            <th width="30%">Mobile-number</th>
                            <td width="2%">:</td>
                            <td>{user.phone}</td>
                          </tr>
                          <tr>
                            <th width="30%">email id</th>
                            <td width="2%">:</td>
                            <td>{user.email}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div></div>
                    <div className="card shadow-sm">
                      <div className="card-header bg-transparent border-0">
                        <h3 className="mb-0">
                          <i className="far fa-clone pr-1"></i>Other Information
                        </h3>
                      </div>
                      <div className="card-body pt-0">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
