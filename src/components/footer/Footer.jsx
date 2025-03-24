import { Container, Row, Col, Nav, Button, Image } from "react-bootstrap";
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter } from "react-bootstrap-icons";
import MarqueeCarouselFooter from "../MarqueeCarousel/MarqueeCarouselFooter";
import { Link } from "react-router-dom";
import "./FooterCSS.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <MarqueeCarouselFooter />

      {/* Prima Sezione - Descrizione */}
      <Container className="py-5 bg-dark text-light">
        <Row className="text-center justify-content-center">
          <Col xs={12} md={8}>
            <p className="fs-4 fw-semibold">"Adotta un amico a 4 zampe oggi stesso e fai la differenza nella vita di un animale!"</p>
            <p className="fs-6">Unisciti a noi nel nostro impegno per trovare case amorevoli a tanti animali in cerca di una famiglia.</p>
          </Col>
        </Row>
      </Container>

      {/* Seconda Sezione - Link Utili */}
      <Container fluid className="bg-warning py-5">
        <Row className="text-center justify-content-around align-items-center">
          <Col xs={12} sm={6} md={3} className="text-center mb-4 mb-md-0">
            <Image width={120} src="https://example.com/logo.png" className="mb-3" />
            <h5 className="fw-bold">Comune di Torino - Ufficio Adozione Animali</h5>
            <p>Via Roma 45, Torino</p>
            <p>Assessore: Alessandra Bianchi | Direttore: Dott. Paolo Rossi</p>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4 mb-md-0">
            <h5 className="fw-bold">Contatti Ufficio Tutela Animali</h5>
            <p>Chiara Mancini & Marco Lupo</p>
            <p>Tel: 011/555389 | Fax: 011/555388</p>
            <p>Orari: Lun-Ven 9.00 - 13.00</p>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4 mb-md-0">
            <Nav className="flex-column">
              <Nav.Link href="#privacy" className="text-dark fw-semibold">
                Privacy Policy
              </Nav.Link>
              <Nav.Link href="#terms" className="text-dark fw-semibold">
                Termini di Servizio
              </Nav.Link>
              <Nav.Link href="#faq" className="text-dark fw-semibold">
                Domande Frequenti
              </Nav.Link>
              <Nav.Link href="#support" className="text-dark fw-semibold">
                Supporto
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4 mb-md-0">
            <Nav className="flex-column">
              <Nav.Link href="#mission" className="text-dark fw-semibold">
                La Nostra Missione
              </Nav.Link>
              <Nav.Link href="#partners" className="text-dark fw-semibold">
                I Nostri Partner
              </Nav.Link>
              <Nav.Link href="#events" className="text-dark fw-semibold">
                Eventi e Iniziative
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>

      {/* Terza Sezione - Social Links con icone dedicate */}
      <Container className="bg-dark py-4 text-light">
        <Row className="text-center justify-content-center">
          <Col xs={3} sm={2} md={1} className="mb-4 mb-md-0">
            <Link to="https://facebook.com" className="text-light icon-link-hover" target="_blank" rel="noopener noreferrer">
              <Facebook size={45} />
            </Link>
          </Col>
          <Col xs={3} sm={2} md={1} className="mb-4 mb-md-0">
            <Link to="https://instagram.com" className="text-light icon-link-hover" target="_blank" rel="noopener noreferrer">
              <Instagram size={45} />
            </Link>
          </Col>
          <Col xs={3} sm={2} md={1} className="mb-4 mb-md-0">
            <Link to="https://twitter.com" className="text-light icon-link-hover" target="_blank" rel="noopener noreferrer">
              <Twitter size={45} />
            </Link>
          </Col>
          <Col xs={3} sm={2} md={1} className="mb-4 mb-md-0">
            <Link to="https://linkedin.com" className="text-light icon-link-hover" target="_blank" rel="noopener noreferrer">
              <Linkedin size={45} />
            </Link>
          </Col>
        </Row>
      </Container>

      {/* Sezione Inferiore - Copyright e Bottone per Tornare in Cima */}
      <Container fluid className="bg-primary py-2">
        <Row className="d-flex align-items-center">
          <Col xs={12} md={6} className="text-md-center text-lg-center  text-sm-center text-light mb-2 mb-md-0">
            <strong>Copyright © </strong>2025 Animal Care Onlus - Sviluppato con passione da <strong>Studio Creativo XYZ</strong>
          </Col>
          <Col xs={12} md={6} className="text-md-end text-lg-end  text-sm-center">
            <Button variant="outline-light" onClick={scrollToTop} className="py-2">
              <ArrowUp className="fs-5" />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
