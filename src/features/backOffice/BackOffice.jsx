import { useState } from "react";
import { Container, Accordion } from "react-bootstrap";
import AnimalManagement from "./management/AnimalManagement";
import AdoptionManagement from "./management/AdoptionManagement";
import UserManagement from "./management/UserManagement";
import ToastMessage from "./toast_message/ToastMessage"; // Import del toast message

const BackOffice = () => {
  // Messaggio di Toast
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });

  // Gestione del messaggio di toast
  const handleToastShow = (message, type = "success") => {
    setToastMessage({ message, type });
  };

  return (
    <Container>
      <h1 className="text-center my-5">BACKOFFICE - ANIMALI / ADOZIONI / ADMIN-VOLUNTEER</h1>

      {/* Messaggio Toast */}
      <ToastMessage toastMessage={toastMessage} setToastMessage={setToastMessage} />

      {/* Sezione Animali */}
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Gestisci Animali</Accordion.Header>
          <Accordion.Body>
            <AnimalManagement handleToastShow={handleToastShow} />
          </Accordion.Body>
        </Accordion.Item>

        {/* Sezione Utenti */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Gestisci Utenti</Accordion.Header>
          <Accordion.Body>
            <UserManagement handleToastShow={handleToastShow} />
          </Accordion.Body>
        </Accordion.Item>

        {/* Sezione Adozioni */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Gestisci Adozioni</Accordion.Header>
          <Accordion.Body>
            <AdoptionManagement handleToastShow={handleToastShow} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default BackOffice;
