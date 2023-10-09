// MessageModal.js

import React, { useState } from "react";

function Modal({ message, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Message Received</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Modal;
