import React, { useState } from "react";
import { Button, Form, Offcanvas, Row, Col, Container, ListGroup, Card, Accordion } from "react-bootstrap";
import { Clock, Envelope, Facebook, Instagram, Map, Phone, Whatsapp } from "react-bootstrap-icons";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [activeKey, setActiveKey] = useState("0"); // To control the Accordion's expanded state

  // Gestione dell'input dei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funzione per inviare il messaggio di contatto
  const sendContactMessage = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/email/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Converti il formData in JSON
      });

      // Verifica che la risposta sia effettivamente JSON
      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json(); // Ottieni la risposta JSON
      } else {
        const text = await response.text();
        console.error("Risposta non JSON:", text);
        return { success: false, message: "Errore nel formato della risposta del server." };
      }

      if (response.ok) {
        return { success: true, message: data.message || "Messaggio inviato con successo!" };
      } else {
        return { success: false, message: data.message || "Errore nel backend." };
      }
    } catch (error) {
      console.error("Errore di rete", error);
      return { success: false, message: "Errore di rete. Riprova più tardi.", error };
    }
  };

  // Gestione dell'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { success, message } = await sendContactMessage(formData);

      if (success) {
        setAlertMessage(
          <p className="fw-bold" style={{ whiteSpace: "pre-line" }}>
            <strong className="fs-4">Grazie per averci contattato!</strong> <span className="fs-1">🐾</span>
            <br />
            <br />
            Abbiamo ricevuto la tua richiesta e il nostro team sarà felice di risponderti al più presto.
            <br />
            <br />
            Ti ringraziamo per il tuo interesse nell’adottare e non vediamo l’ora di aiutarti a trovare il tuo nuovo amico a 4 zampe!
          </p>
        );
      } else {
        setAlertMessage(message || "Si è verificato un errore. Per favore riprova più tardi.");
      }
    } catch (error) {
      console.error("Errore nel submit del form", error);
      setAlertMessage("Errore nell'invio della richiesta. Riprova più tardi.");
    }

    setShowOffcanvas(true); // Mostra l'alert

    // Reset dei campi del form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row className="d-flex justify-content-around">
          {/* Sezione Form di Contatto */}
          <Col md={6} lg={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Inserisci il tuo nome" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Inserisci la tua email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="message" className="mt-3">
                <Form.Label>Messaggio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Scrivi qui il tuo messaggio"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Invia
              </Button>
            </Form>
          </Col>

          {/* Sezione Contatti */}
          <Col md={6} lg={5}>
            {/* Accordion visibile solo su schermi piccoli */}
            <div className="d-block d-sm-none">
              <Accordion activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Contatti</Accordion.Header>
                  <Accordion.Body>
                    <Card className="shadow-lg border-0 mt-3 mt-md-0 mt-sm-2 mb-0">
                      <Card.Body>
                        <h5>Per qualsiasi informazione, siamo qui per aiutarti!</h5>
                        <p>Se hai domande sull'adozione, sui nostri animali o su come funziona il nostro processo, non esitare a contattarci.</p>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <Phone className="me-2" />
                            <strong>Telefono:</strong> 123-456-7890
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Envelope className="me-2" />
                            <strong>Email:</strong> info@adopteasy.com
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Map className="me-2" />
                            <strong>Indirizzo:</strong> Via degli Animali 123, Città
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Whatsapp className="me-2" />
                            <strong>WhatsApp:</strong> 123-456-7890
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Clock className="me-2" />
                            <strong>Orari di apertura:</strong> Lun-Ven: 9:00 - 18:00
                          </ListGroup.Item>
                        </ListGroup>
                        {/* Pulsanti Social Media */}
                        <div className="d-flex justify-content-evenly mt-3">
                          <Button variant="link" href="https://facebook.com/adopteasy" target="_blank" className="text-decoration-none">
                            <Facebook size={30} color="#3b5998" />
                          </Button>
                          <Button variant="link" href="https://instagram.com/adopteasy" target="_blank" className="text-decoration-none">
                            <Instagram size={30} color="#E4405F" />
                          </Button>
                        </div>

                        {/* Pulsante WhatsApp */}
                        <div className="mt-4 text-center">
                          <Button variant="success" href="https://wa.me/1234567890?text=Ciao, sono interessato all'adozione!" target="_blank" className="w-100">
                            <Whatsapp className="me-2" />
                            Contattaci su WhatsApp
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            {/* Card visibile solo su schermi grandi */}
            <div className="d-none d-sm-block">
              <Card className="shadow-lg border-0 mt-3 mt-md-0 mt-sm-2 mb-0">
                <Card.Header className="text-center bg-primary text-white">
                  <h5 className="m-0 p-0">Contatti</h5>
                </Card.Header>
                <Card.Body>
                  <h5>Per qualsiasi informazione, siamo qui per aiutarti!</h5>
                  <p>Se hai domande sull'adozione, sui nostri animali o su come funziona il nostro processo, non esitare a contattarci.</p>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Phone className="me-2" />
                      <strong>Telefono:</strong> 123-456-7890
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Envelope className="me-2" />
                      <strong>Email:</strong> info@adopteasy.com
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Map className="me-2" />
                      <strong>Indirizzo:</strong> Via degli Animali 123, Città
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Whatsapp className="me-2" />
                      <strong>WhatsApp:</strong> 123-456-7890
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Clock className="me-2" />
                      <strong>Orari di apertura:</strong> Lun-Ven: 9:00 - 18:00
                    </ListGroup.Item>
                  </ListGroup>
                  {/* Pulsanti Social Media */}
                  <div className="d-flex justify-content-evenly mt-3">
                    <Button variant="link" href="https://facebook.com/adopteasy" target="_blank" className="text-decoration-none">
                      <Facebook size={30} color="#3b5998" />
                    </Button>
                    <Button variant="link" href="https://instagram.com/adopteasy" target="_blank" className="text-decoration-none">
                      <Instagram size={30} color="#E4405F" />
                    </Button>
                  </div>

                  {/* Pulsante WhatsApp */}
                  <div className="mt-4 text-center">
                    <Button variant="success" href="https://wa.me/1234567890?text=Ciao, sono interessato all'adozione!" target="_blank" className="w-100">
                      <Whatsapp className="me-2" />
                      Contattaci su WhatsApp
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Offcanvas per la conferma di invio messaggio */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="top"
        style={{
          height: "40%",
          width: "auto",
          maxWidth: "50%",
          margin: "auto auto",
          borderRadius: "12px 12px 12px 12px",
          boxShadow: "0 8px 12px rgba(62, 62, 62, 0.44)",
        }}
        scrollable="true"
      >
        <Offcanvas.Body className="d-flex text-center justify-content-center align-items-center bg-opacity-25">{alertMessage}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ContactUs;
