import { Col, Container, Image, Nav, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="bg-light py-2">
      <Row className="w-100 text-center justify-content-center border-top border-3 ">
        {/* Colonna sinistra con descrizione o nome del sito */}
        <Col className="text-dark mt-4">
          <p className="fs-5 fw-semibold">Trova il tuo compagno a 4 zampe oggi! Adotta un amico, cambia una vita.</p>
        </Col>
      </Row>

      {/* Colonna destra con link utili */}
      <Row className=" text-center justify-content-center">
        <Col md={6} className="">
          <Nav className="">
            <Nav.Link href="#home" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link href="#features" className="text-dark">
              Features
            </Nav.Link>
            <Nav.Link href="#pricing" className="text-dark">
              Pricing
            </Nav.Link>
            <Nav.Link href="#contact" className="text-dark">
              Contatti
            </Nav.Link>
            <Nav.Link href="#privacy" className="text-dark">
              Privacy Policy
            </Nav.Link>
            <Nav.Link href="#terms" className="text-dark">
              Termini di Servizio
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
      <h1>ciao ciaoS</h1>
      {/* Row per il copyright */}
      <Row className="mt-3 mb-3">
        <Col className="text-center text-dark">
          <span>&copy; {new Date().getFullYear()} Adopt Easy. Tutti i diritti riservati.</span>
        </Col>
      </Row>
    </Container>
  );
};
export default Footer;
