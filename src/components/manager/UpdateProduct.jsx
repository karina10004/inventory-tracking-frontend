import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
import Managermenu from "./manager-menu";

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

  const getCategories = async () => {
    const response = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/category"
    );
    const resJson = await response.json();
    setCategories(resJson);
  };
  const token = localStorage.getItem("access_token");
  const url = window.location.href;
  const reqparam = url.split(
    "https://inventory-tracking.netlify.app/update/product/"
  )[1];

  const getProduct = async () => {
    // console.log(reqparam);
    const res = await fetch(
      `https://inventory-tracking.onrender.com/api/v1/product/${reqparam}`,
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
        `https://inventory-tracking.onrender.com/api/v1/product/${reqparam}`,
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
        history.push("/manager/dashboard");
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
          <Managermenu></Managermenu>
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
