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
      <Container className="py-3 bg-dark rounded-top-4 mt-2 text-light">
        <Row className="text-center justify-content-center">
          <Col xs={12} md={8}>
            <p className="fs-4 fw-semibold">"Adotta un amico a 4 zampe oggi stesso e fai la differenza nella vita di un animale!"</p>
            <p className="fs-6">Unisciti a noi nel nostro impegno per trovare case amorevoli a tanti animali in cerca di una famiglia.</p>
          </Col>
        </Row>
      </Container>

      {/* Seconda Sezione - Link Utili */}
      <Container fluid>
        <Row className="text-center justify-content-around align-items-center">
          <Col xs={12} sm={6} md={4} className="text-center">
            <Image width={120} src="/src/assets/PieSport_Logo_Vert_Col_Neg.png" />
            <h5 className="fw-bold">Comune di Torino - Ufficio Adozione Animali</h5>
            <p className="mb-0">Via Roma 45, Torino</p>
            <p>Assessore: Alessandra Bianchi | Direttore: Dott. Paolo Rossi</p>
          </Col>

          <Col xs={12} sm={6} md={2}>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="#privacy" className="footer-link text-dark fw-semibold">
                Privacy Policy
              </Nav.Link>
              <Nav.Link as={Link} to="#terms" className="footer-link text-dark fw-semibold">
                Termini di Servizio
              </Nav.Link>
              <Nav.Link as={Link} to="#faq" className="footer-link text-dark fw-semibold">
                Domande Frequenti
              </Nav.Link>
              <Nav.Link as={Link} to="#support" className="footer-link text-dark fw-semibold">
                Supporto
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} sm={6} md={2}>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="#mission" className="footer-link text-dark fw-semibold">
                La Nostra Missione
              </Nav.Link>
              <Nav.Link as={Link} to="#partners" className="footer-link text-dark fw-semibold">
                I Nostri Partner
              </Nav.Link>
              <Nav.Link as={Link} to="#events" className="footer-link text-dark fw-semibold">
                Eventi e Iniziative
              </Nav.Link>
              <Nav.Link as={Link} to="#centri-affiliati" className="footer-link text-dark fw-semibold">
                Centri affiliati
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} sm={6} md={4} className="text-center">
            <Image src="/src/assets/AdoptEasy.gif" fluid width={120} className="rounded-circle" />
            <h5 className="fw-bold">Contatti Ufficio Tutela Animali</h5>
            <p className="mb-0">Chiara Mancini & Marco Lupo</p>
            <p>Tel: 011/555389 | Fax: 011/555388</p>
          </Col>
        </Row>
      </Container>

      {/* Terza Sezione - Social Links con icone dedicate */}
      <Container className="bg-dark mb-2 rounded-bottom-4 py-2 text-light">
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
