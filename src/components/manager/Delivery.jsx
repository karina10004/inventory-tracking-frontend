import React, { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Managermenu from "./manager-menu";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Delivery = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState({});
  const [doneOrders, setDoneOrders] = useState({});
  const [mappedList, setMappedList] = useState({});

  const token = localStorage.getItem("access_token");

  const getDeliveryMen = async (req, res) => {
    const response = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/delivery/manager/free",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resJson = await response.json();
    // const data = resJson.splice(1);
    // console.log(data);
    setDeliveryMen(resJson);
  };

  const getOrders = async () => {
    const res1 = await fetch(
      "https://inventory-tracking.onrender.com/api/v1/orders/order/manager/2",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res1Json = await res1.json();
    setOrders(res1Json);
    // console.log(orders);
  };

  const handleDeliveryManChange = async (e, orderId) => {
    const dm_id = e.target.value;
    setSelectedOrders((prevSelectedOrders) => ({
      ...prevSelectedOrders,
      [orderId]: dm_id,
    }));
  };

  const handleDoneChange = async (order_id) => {
    if (selectedOrders[order_id]) {
      setDoneOrders((prevDoneOrders) => ({
        ...prevDoneOrders,
        [order_id]: true,
      }));
      setMappedList((prevMappedList) => {
        const updatedList = { ...prevMappedList };
        const dm_id = selectedOrders[order_id];

        if (!updatedList[dm_id]) {
          updatedList[dm_id] = [];
        }

        updatedList[dm_id][updatedList[dm_id].length] = order_id;
        updatedList[dm_id].filter(
          (item, index) => updatedList[dm_id].indexOf(item) === index
        );
        return updatedList;
      });
      //   console.log(mappedList);
    }
  };

  const handleDeleteChange = async (order_id) => {
    if (selectedOrders[order_id]) {
      setDoneOrders((prevDoneOrders) => ({
        ...prevDoneOrders,
        [order_id]: false,
      }));
      setMappedList((prevMappedList) => {
        const updatedList = { ...prevMappedList };
        const dm_id = selectedOrders[order_id];

        if (updatedList[dm_id]) {
          updatedList[dm_id] = updatedList[dm_id].filter(
            (id) => id !== order_id
          );
        }
        return updatedList;
      });
    }
  };

  const handleShipChange = async (dm_id) => {
    if (mappedList[dm_id]) {
      const orders = mappedList[dm_id].filter(
        (item, index) => mappedList[dm_id].indexOf(item) === index
      );

      const res1 = await fetch(
        `https://inventory-tracking.onrender.com/api/v1/delivery/availability/${dm_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            availability: false,
          }),
        }
      );
      getDeliveryMen();

      orders.map(async (order_id) => {
        const res1 = await fetch(
          `https://inventory-tracking.onrender.com/api/v1/orders/order/status/${order_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status_id: 3,
            }),
          }
        );

        const res2 = await fetch(
          `https://inventory-tracking.onrender.com/api/v1/orders/order/delivery/${order_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              dm_id: dm_id,
            }),
          }
        );
      });
    }
  };

  useEffect(() => {
    getOrders();
    getDeliveryMen();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Managermenu></Managermenu>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Inventory Tracking System</h4>
          </div>
          <div className="px-5 py-3">
            <div className="d-flex justify-content-center mt-2">
              <h3>Order List that are to be approved</h3>
            </div>
            <div className="mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order-Id</th>
                    <th>Ammount</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Select Delivery Man</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    if (doneOrders[order.order_id] === true) {
                      return;
                    }
                    return (
                      <tr key={index}>
                        <td>{order.order_id}</td>
                        <td>{order.total_ammount}</td>
                        <td>{order.customer_id}</td>
                        <td>{order.order_date.split("T")[0]}</td>
                        <td>
                          {
                            <select
                              value={selectedOrders[order.order_id] || ""}
                              onChange={(e) =>
                                handleDeliveryManChange(e, order.order_id)
                              }
                            >
                              <option value="">Select a Delivery Man</option>
                              {deliveryMen.map((deliveryMan, index) => {
                                return (
                                  <option
                                    key={deliveryMan.dm_id}
                                    value={deliveryMan.dm_id}
                                  >
                                    {deliveryMan.fullname}
                                  </option>
                                );
                              })}
                            </select>
                          }
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              handleDoneChange(order.order_id);
                            }}
                          >
                            <DoneIcon></DoneIcon>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <h3>Available Delivery Man</h3>
            </div>
            <div className="mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Selected Orders</th>
                    <th>Ship</th>
                    {/* <th>Select Delivery Man</th> */}

                    {/* <th>orders</th>
              <th>Sales</th> */}
                  </tr>
                </thead>
                <tbody>
                  {deliveryMen.map((deliveryMan, index) => {
                    return (
                      <tr key={index}>
                        <td>{deliveryMan.fullname}</td>
                        <td>{deliveryMan.phone}</td>
                        <td>
                          {mappedList[deliveryMan.dm_id] &&
                            mappedList[deliveryMan.dm_id].map((order_id) => {
                              return (
                                <div>
                                  Order - {order_id}
                                  {"  "}
                                  <button
                                    className="fs-16"
                                    onClick={() => {
                                      handleDeleteChange(order_id);
                                    }}
                                  >
                                    <DeleteOutlineIcon></DeleteOutlineIcon>
                                  </button>
                                </div>
                              );
                            })}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              handleShipChange(deliveryMan.dm_id);
                            }}
                          >
                            <LocalShippingIcon></LocalShippingIcon>
                          </button>
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
};

export default Delivery;
