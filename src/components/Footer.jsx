import { Col, Container, Image, Nav, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";

const Footer = () => {
  return (
    <Container className="py-2">
      <Row className=" text-center justify-content-center border-top border-3 ">
        {/* Colonna sinistra con descrizione o nome del sito */}
        <Col className="text-dark mt-4">
          <p className="fs-5 fw-semibold">Trova il tuo compagno a 4 zampe oggi! Adotta un amico, cambia una vita.</p>
        </Col>
      </Row>

      <Marquee>
        <Image
          width={160}
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FuZXxlbnwwfHwwfHx8MA%3D%3D"
        />
        <Image
          width={200}
          src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhdHRvfGVufDB8fDB8fHww"
        />
        <Image
          width={240}
          src="https://plus.unsplash.com/premium_photo-1695410444705-ed7c2c712a5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNyaWNldG98ZW58MHx8MHx8fDA%3D"
        />
        <Image
          width={200}
          src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F2aWF8ZW58MHx8MHx8fDA%3D"
        />
        <Image
          width={160}
          src="https://images.unsplash.com/photo-1597776941486-054bf5529210?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRhcnRhcnVnYXxlbnwwfHwwfHx8MA%3D%3D"
        />
        <Image
          width={200}
          src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFpYWxpbm98ZW58MHx8MHx8fDA%3D"
        />
        <Image
          width={240}
          src="https://images.unsplash.com/photo-1597776941486-054bf5529210?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRhcnRhcnVnYXxlbnwwfHwwfHx8MA%3D%3D"
        />
        <Image
          width={200}
          src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFpYWxpbm98ZW58MHx8MHx8fDA%3D"
        />
      </Marquee>

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
