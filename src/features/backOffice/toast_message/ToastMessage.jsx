import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";

const ToastMessage = ({ toastMessage, setToastMessage }) => {
  useEffect(() => {
    if (toastMessage.message) {
      const timer = setTimeout(() => setToastMessage({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  return (
    toastMessage.message && (
      <Toast onClose={() => setToastMessage({ message: "", type: "" })} show={true} delay={3000} autohide className={`text-white bg-${toastMessage.type}`}>
        <Toast.Body>{toastMessage.message}</Toast.Body>
      </Toast>
    )
  );
};

export default ToastMessage;
