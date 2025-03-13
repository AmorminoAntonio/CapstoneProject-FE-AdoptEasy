import { Col, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import { useState } from "react";
import LoginModal from "./LoginModal";

const MyNav = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Container fluid className="bg-warning">
        <Row className="text-center pt-2 p">
          <Col>
            <h6 className="fw-lighter ">
              <span className="fw-bold">ADOPT EASY</span> Associazione Tutela Animali - Sede legale: S.P Pavia n°36 - Valmadonna(ALESSANDRIA)
            </h6>
          </Col>
        </Row>
      </Container>
      <Navbar sticky="top" expand="lg" className="bg-white">
        <Container fluid className="mx-1 py-2 d-flex justify-content-between">
          <Row className="text-center">
            <Col>
              <Navbar.Brand as={Link} to="/">
                <Image src="/src/assets/ADOPT EASY (1).svg" width={150} />
              </Navbar.Brand>
            </Col>
          </Row>
          <Row>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className=" my-2 my-lg-0" style={{ maxHeight: "200px" }} navbarScroll>
                <Nav.Link as={Link} to="/">
                  HOME
                </Nav.Link>
                <Nav.Link as={Link} to="/posts">
                  ALBUM ADOZIONI
                </Nav.Link>
                <Nav.Link as={Link} to="#">
                  CHI SIAMO
                </Nav.Link>
                <Nav.Link as={Link} to="/posts">
                  ALBUM ADOZIONI
                </Nav.Link>
                <NavDropdown title="LE NOSTRE SEDI" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">RIFUGIO "LA ROSA"</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">LA CASCINA SANARIA</NavDropdown.Item>
                  <NavDropdown.Item href="#action3">RIFUGIO "IL CEDRO"</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">IL GATTILE SANITARIO</NavDropdown.Item>
                  <NavDropdown.Item href="#action3">IL CANILE SANITARIO</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">CASCINA "LISONDRIA</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/posts">
                  EVENTI
                </Nav.Link>
                <Nav.Link as={Link} to="/posts">
                  CONTATTI
                </Nav.Link>
              </Nav>
              <Button variant="outline-primary " onClick={() => setShowRegister(true)} className="rounded-pill ms-4 me-1 py-1 fw-semibold">
                REGISTRATI
              </Button>
              <Button variant="outline-primary " onClick={() => setShowLogin(true)} className="rounded-pill py-1 fw-semibold">
                LOGIN
              </Button>
            </Navbar.Collapse>
          </Row>
        </Container>
      </Navbar>
      <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
};

export default MyNav;
