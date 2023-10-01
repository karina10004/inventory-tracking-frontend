import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
function Home() {
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: adminCount</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Products</h4>
          </div>
          <hr />
          <div className="">
            <h5>ProductCount</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Product Cost</h4>
          </div>
          <hr />
          <div className="">
            <h5>Cost</h5>
          </div>
        </div>
      </div>

      {/* List of admin  */}
      <div className="mt-4 px-5 pt-3">
        <h3>List of Products</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>shops</td>
              <td>product name</td>
            </tr>
            <tr>
              <td>something</td>
              <td>something</td>
            </tr>
            <tr>
              <td>something</td>
              <td>something</td>
            </tr>
            <tr>
              <td>something</td>
              <td>something</td>
            </tr>
            <tr>
              <td>something</td>
              <td>something</td>
            </tr>
            <tr>
              <td>something</td>
              <td>something</td>
            </tr>
            <tr>
              <td>something</td>
              <td>something</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
