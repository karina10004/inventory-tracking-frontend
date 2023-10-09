import React from "react";
import CustomerMenu from "./CustomerMenu";
const CustomerDashboard = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <CustomerMenu></CustomerMenu>
          <div class="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
              <h4>Inventory Tracking System</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
