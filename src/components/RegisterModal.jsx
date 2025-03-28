import { useEffect, useState } from "react";
import { Button, Form, Modal, Toast, ToastContainer } from "react-bootstrap";

const RegisterModal = ({ show, handleClose }) => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    username: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // 'success' or 'danger'

  useEffect(() => {
    if (!show) setFormData(initialFormState);
  }, [show]);

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Il nome è obbligatorio.";
    if (!formData.lastName.trim()) newErrors.lastName = "Il cognome è obbligatorio.";
    if (!formData.username.trim()) newErrors.username = "Lo username è obbligatorio.";
    if (!formData.phone.trim()) newErrors.phone = "Il telefono è obbligatorio.";
    if (!formData.address.trim()) newErrors.address = "L'indirizzo è obbligatorio.";
    if (!formData.email.trim() || formData.email.length < 5 || formData.email.length > 40) newErrors.email = "L'email deve avere tra 5 e 40 caratteri.";
    if (!formData.password.trim() || formData.password.length < 3 || formData.password.length > 20)
      newErrors.password = "La password deve avere tra 3 e 20 caratteri.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        console.log("Dati inviati:", JSON.stringify(formData, null, 2));

        const response = await fetch("http://localhost:8080/utente/registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Risposta dal server:", data);

        if (response.ok) {
          console.log("Registrazione effettuata con successo", data);
          setToastMessage(`La tua registrazione è stata completata con successo!  
          Grazie per esserti registrato, ${formData.firstName}. Sei ora parte della nostra famiglia e pronto per iniziare il viaggio nell'adozione dei tuoi futuri amici a quattro zampe! Benvenuto!`);
          setToastVariant("success");
          setShowToast(true);
          handleClose();
        } else {
          setRegisterError(data.error || data.message || "Errore durante la registrazione.");
          setToastMessage(data.error || data.message || "Errore durante la registrazione.");
          setToastVariant("danger");
          setShowToast(true);
        }
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        setRegisterError("Si è verificato un errore durante la registrazione.");
        setToastMessage("Si è verificato un errore durante la registrazione.");
        setToastVariant("danger");
        setShowToast(true);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrati</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
              {errors.username && <p className="text-danger">{errors.username}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Indirizzo</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
              {errors.address && <p className="text-danger">{errors.address}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </Form.Group>

            {registerError && <p className="text-danger">{registerError}</p>}

            <Button variant="primary" type="submit">
              Registrati
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ToastContainer for showing messages */}
      <ToastContainer className="custom-toast-container" position="top-center">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} bg={toastVariant} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default RegisterModal;
