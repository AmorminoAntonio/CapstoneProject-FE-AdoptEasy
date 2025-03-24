import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const LoginModal = ({ show, handleClose, handleLogin }) => {
  const initialFormState = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  // Reset campi quando il modale si chiude
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validazione dei dati
    if (validate()) {
      try {
        const response = await fetch("http://localhost:8080/utente/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Login effettuato con successo", data);

          // Verifica che la risposta contenga un token
          if (data && data.token) {
            // Memorizza il token nel localStorage
            localStorage.setItem("authToken", data.token);

            // Passa i dati dell'utente al componente padre
            handleLogin(data);

            // Chiudi il modale
            handleClose();
          } else {
            setLoginError("Token non trovato nella risposta del server.");
          }
        } else {
          setLoginError(data.message || "Credenziali errate");
        }
      } catch (error) {
        console.error("Errore di login:", error);
        setLoginError("Si è verificato un errore durante il login.");
      }
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
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
            {errors.username && <p className="text-danger">{errors.username}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </Form.Group>

          {loginError && <p className="text-danger">{loginError}</p>}

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default LoginModal;
