import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LoginModal = ({ show, handleClose }) => {
  const initialFormState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // ✅ Reset campi quando il modale si chiude
  useEffect(() => {
    if (!show) setFormData(initialFormState);
  }, [show]);

  const validate = () => {
    let newErrors = {};
    if (formData.username.length < 5 || formData.username.length > 40) newErrors.email = "L'username deve avere tra 5 e 40 caratteri.";
    if (formData.password.length < 3 || formData.password.length > 20) newErrors.password = "La password deve avere tra 3 e 20 caratteri.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Dati login inviati:", formData);
      setFormData(initialFormState); // ✅ Resetta i campi dopo l'invio
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>username</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
