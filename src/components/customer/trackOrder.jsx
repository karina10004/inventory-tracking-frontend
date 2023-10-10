import React from "react";
import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleMap, Marker } from "@react-google-maps/api";
import CustomerMenu from "./CustomerMenu";
import socket from "../../socket";
function TrackOrder() {
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState({});
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [inputOrderId, setInputOrderId] = useState(0);
  const [showMap, setShowMap] = useState(false);

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const getOrder = async () => {
    console.log(inputOrderId);
    const res1 = await fetch(
      `https://inventory-tracking.onrender.com/api/v1/orders/order/${inputOrderId}`,
      {
        method: "GET",
      }
    );
    const res1Json = await res1.json();

    if (res1Json.status_id === 3) {
      if (order.delivery_man_id) {
        socket.emit("leave room", [order.delivery_man_id]);
        const newCoords = {
          lat: 0,
          lng: 0,
        };
        setCoordinates(newCoords);
      }
      socket.emit("join room", [res1Json.delivery_man_id]);
      setShowMap(true);
    } else {
      setShowMap(false);
    }
    setOrder(res1Json);
  };

  useEffect(() => {
    socket.on("locationUpdate", (data) => {
      const newCoords = {
        lat: data[0],
        lng: data[1],
      };
      console.log(data);
      console.log(newCoords);
      setCoordinates(newCoords);
    });

    // getManager();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <CustomerMenu></CustomerMenu>
        <div class="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Inventory Tracking System</h4>
          </div>
          <div className="mt-3">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Order ID"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  getOrder();
                }}
              >
                Track Order
              </button>
            </div>
          </div>
          {showMap && (
            <div className="mt-3 mx-auto">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={coordinates}
                zoom={15}
                googleMapsApiKey="AIzaSyB-Nv4msZO1zHO2Zm34f2x6_FmBXdr3c-Y"
              >
                <Marker position={coordinates}></Marker>
              </GoogleMap>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
