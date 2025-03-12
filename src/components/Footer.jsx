import { Col, Container, Nav, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter, Linkedin } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <Container className="py-4">
      {/* Colonna con descrizione o nome del sito */}
      <Row className="w-100 text-center justify-content-center border-top border-3 py-3">
        <Col className="text-dark mt-4">
          <p className="fs-5 fw-semibold">Trova il tuo compagno a 4 zampe oggi! Adotta un amico, cambia una vita.</p>
        </Col>
      </Row>

      {/* Collegamenti utili */}
      <Row className="text-center justify-content-center">
        <Col md={6} className="mb-3">
          <Nav className="justify-content-center">
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

      {/* Collegamenti ai Social Media */}
      <Row className="text-center justify-content-center mb-3">
        <Col>
          <p className="fs-6 text-dark mb-2">Seguici sui nostri social</p>
          <div>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
              <Facebook size={30} style={{ color: "#3b5998" }} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-3">
              <Instagram size={30} style={{ color: "#e4405f" }} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
              <Twitter size={30} style={{ color: "#1da1f2" }} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="me-3">
              <Linkedin size={30} style={{ color: "#0077b5" }} />
            </a>
          </div>
        </Col>
      </Row>

      {/* Copyright */}
      <Row className="mt-3 mb-3">
        <Col className="text-center text-dark">
          <span>&copy; {new Date().getFullYear()} Adopt Easy. Tutti i diritti riservati.</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
