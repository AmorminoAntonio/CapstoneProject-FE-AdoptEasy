import { Container, Row, Col, Nav, Button, Image } from "react-bootstrap";
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter, TwitterX } from "react-bootstrap-icons"; // Assicurati di aver installato react-bootstrap-icons
import MarqueeCarouselFooter from "./MarqueeCarousel/MarqueeCarouselFooter";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <MarqueeCarouselFooter />
      {/* Prima Sezione - Descrizione */}
      <Container className="py-2">
        <Row className="text-center justify-content-center border-top border-3">
          <Col className="text-dark mt-4">
            <p className="fs-5 fw-semibold">Trova il tuo compagno a 4 zampe oggi! Adotta un amico, cambia una vita.</p>
          </Col>
        </Row>
      </Container>

      {/* Seconda Sezione - Link Utili */}
      <Container fluid className="bg-warning py-4">
        <Row className="text-center justify-content-around align-items-center">
          <Col md={2} className="text-center">
            <Image width={100} src="https://www.associazionetutelaanimali.org/wp-content/uploads/2018/04/Logo_Alessandria.png" />
            <h5>Comune di Alessandria Ufficio Welfare Animale</h5>
            <p>P.zza Libertà, n. 1 Alessandria Assessore: Giovanni BAROSINI Direttore: Ing. Marco Neri</p>
          </Col>
          <Col md={2}>
            <h5>Referenti dell'Ufficio Tutela Animali:</h5>
            <p>Roberta TAVERNA Sandro LUCCA Tel. 0131/515249 - Fax 0131/515430 Orario al pubblico: dal lunedì al venerdì 9.00 - 12.30</p>
          </Col>
          <Col md={2}>
            <Nav className="flex-column">
              <Nav.Link href="#privacy" className="text-dark">
                Privacy Policy
              </Nav.Link>
              <Nav.Link href="#terms" className="text-dark">
                Termini di Servizio
              </Nav.Link>
              <Nav.Link href="#terms" className="text-dark">
                Termini di Servizio
              </Nav.Link>
              <Nav.Link href="#terms" className="text-dark">
                Termini di Servizio
              </Nav.Link>
              {/* Aggiungi eventuali altri link se necessario */}
            </Nav>
          </Col>
          <Col md={2}>
            <Nav className="flex-column">
              <Nav.Link href="#privacy" className="text-dark">
                Privacy Policy
              </Nav.Link>
              <Nav.Link href="#terms" className="text-dark">
                Termini di Servizio
              </Nav.Link>
              <Nav.Link href="#terms" className="text-dark">
                Termini di Servizio
              </Nav.Link>
              <Nav.Link href="#terms" className="text-dark">
                Termini di Servizio
              </Nav.Link>
              {/* Aggiungi eventuali altri link se necessario */}
            </Nav>
          </Col>
        </Row>
      </Container>

      {/* Terza Sezione - Copyright e Social Links */}
      <Container fluid className="bg-warning py-4">
        <Row className="mt-3 mb-1 py-3">
          <Col className="text-center">
            <div>
              <a href="https://facebook.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
                <Facebook size={30} />
              </a>
              <a href="https://instagram.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
                <Instagram size={30} />
              </a>
              <a href="https://twitter.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
                <Twitter size={30} />
              </a>
              <a href="https://linkedin.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
                <Linkedin size={30} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Sezione Inferiore - Bottone per Tornare in Cima */}
      <Container fluid className="bg-success py-1">
        <Row className="d-flex align-items-center">
          <Col className="text-end">
            <span className="text-light">
              <strong>Copyright © </strong>2025 Adopt Easy Tema: <strong>Flash di ThemeGrill</strong>. Proudly powered by <strong>myself</strong>
            </span>
          </Col>
          <Col className="text-end">
            <Button variant="outline-light" onClick={scrollToTop} className="py-2">
              <ArrowUp className="fs-6" />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
