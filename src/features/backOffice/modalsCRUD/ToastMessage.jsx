import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ show, message, variant, onClose }) => (
  <ToastContainer position="top-center">
    <Toast show={show} onClose={onClose} delay={3000} autohide>
      <Toast.Body className={variant}>{message}</Toast.Body>
    </Toast>
  </ToastContainer>
);

export default ToastMessage;
