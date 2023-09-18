import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function Updateproduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  //   const [product, setProduct] = useState({});
  const history = useHistory();

  const getCategories = async (req, res) => {
    const response = await fetch("http://localhost:8080/api/v1/category");
    const resJson = await response.json();
    setCategories(resJson);
  };
  const token = localStorage.getItem("access_token");
  const url = window.location.href;
  const reqparam = url.split("http://localhost:3000/update/product/")[1];

  const getProduct = async () => {
    // console.log(reqparam);
    const res = await fetch(
      `http://localhost:8080/api/v1/product/${reqparam}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      const resJson = await res.json();
      //   console.log(resJson);
      setName(resJson.product_name);
      setDescription(resJson.description);
      setPrice(resJson.price);
      setQuantity(resJson.quantity);
      setThreshold(resJson.threshhold);
      setCategory(resJson.category_id);
    }
  };

  useEffect(() => {
    getCategories();
    getProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // var selected = document.getElementById("Category");
      // console.log(selected.options[selected.selectedIndex].value);
      // setCategory(selected.options[selected.selectedIndex].value);
      const res = await fetch(
        `http://localhost:8080/api/v1/product/${reqparam}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_name: name,
            description: description,
            price: price,
            quantity: quantity,
            threshold: threshold,
            category_id: category,
          }),
        }
      );
      if (res.status === 200) {
        console.log("updated");
        console.log(category);
        history.push("/inventory");
      } else {
        console.log("some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className="d-flex flex-column align-items-center pt-4">
              <h2>Update Product</h2>
              <form class="row g-3 w-50" onSubmit={handleSubmit}>
                <div class="col-12">
                  <label for="inputName" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="name"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="col-12">
                  <label for="inputEmail4" class="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="price"
                    autoComplete="off"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div class="col-12">
                  <label for="inputPassword4" class="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="Quantity"
                    placeholder="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div class="col-12">
                  <label for="inputSalary" class="form-label">
                    Threshold
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="Threshold"
                    placeholder="threshold"
                    autoComplete="off"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                  />
                </div>
                <div class="col-12">
                  <label for="Category">Choose category:</label>
                  <select
                    name="Category"
                    id="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((categoryitem) => {
                      // console.log(category);
                      return (
                        <option
                          value={categoryitem.category_id}
                          key={categoryitem.category_id}
                        >
                          {categoryitem.category_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div class="col-12">
                  <label for="inputAddress" class="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="description"
                    autoComplete="off"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {/* <div class="col-12 mb-3">
                  <label class="form-label" for="inputGroupFile01">
                    Select Image
                  </label>
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile01"
                    onChange={(e) =>
                      setData({ ...data, image: e.target.files[0] })
                    }
                  />
                </div> */}
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updateproduct;
