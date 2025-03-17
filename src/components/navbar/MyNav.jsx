import { Col, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import RegisterModal from "../../features/RegisterModal";
import { useState, useEffect } from "react";
import LoginModal from "../../features/LoginModal";
import { jwtDecode } from "jwt-decode";
import "./MyNavCSS.css";

const MyNav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null); // Stato che tiene traccia dell'utente loggato
  const [role, setRole] = useState(null); // Stato per il ruolo

  const handleLogin = (response) => {
    console.log("Risposta ricevuta:", response);
    if (response && response.token) {
      const token = response.token;
      if (typeof token === "string") {
        try {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
          setRole(decodedToken.roles);
          localStorage.setItem("authToken", token);
        } catch (error) {
          console.error("Errore nella decodifica del token:", error);
        }
      } else {
        console.error("Il token non è una stringa valida:", token);
      }
    } else {
      console.error("La risposta non contiene un token valido", response);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("authToken");
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setRole(userData.role);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      if (typeof token === "string") {
        try {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
          setRole(decodedToken.roles);
        } catch (error) {
          console.error("Errore nella decodifica del token da localStorage:", error);
        }
      }
    }
  }, []);

  return (
    <>
      <Container fluid className="bg-warning">
        <Row className="text-center pt-2">
          <Col>
            <h6 className="fw-lighter">
              <span className="fw-bold">ADOPT EASY</span> Associazione Tutela Animali - Sede legale: S.P Pavia n°36 - Valmadonna(ALESSANDRIA)
            </h6>
          </Col>
        </Row>
      </Container>
      <Navbar sticky="top" expand="lg" className="bg-light py-2">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src="/src/assets/ADOPT EASY (1).svg" width={100} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-link-custom" as={Link} to="/homepage">
                HOME
              </Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/album-4zampe">
                ALBUM ADOZIONI
              </Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/ChiSiamo">
                CHI SIAMO
              </Nav.Link>
              <NavDropdown className="dropdown-item-custom" title="LE NOSTRE SEDI" id="navbarScrollingDropdown">
                <NavDropdown.Item className="dropdown-item-custom" href="#action3">
                  RIFUGIO "LA ROSA"
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action4">
                  LA CASCINA SANARIA
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action3">
                  RIFUGIO "IL CEDRO"
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action4">
                  IL GATTILE SANITARIO
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action3">
                  IL CANILE SANITARIO
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action4">
                  CASCINA "LISONDRIA"
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="nav-link-custom" as={Link} to="/posts">
                EVENTI
              </Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/contattaci">
                CONTATTACI
              </Nav.Link>

              {role && (role === "ADMIN" || role === "VOLUNTEER") && (
                <Nav.Link className="nav-link-custom" as={Link} to="/backoffice">
                  BackOffice
                </Nav.Link>
              )}
            </Nav>
            {!user ? (
              <>
                <Button variant="outline-dark" onClick={() => setShowRegister(true)} className="nav-btn">
                  Registrati
                </Button>
                <Button variant="outline-dark" onClick={() => setShowLogin(true)} className="nav-btn">
                  Login
                </Button>
              </>
            ) : (
              <>
                <span>Benvenuto, {user.sub}!</span>
                <Button variant="outline-dark" className="ms-4 nav-btn" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} handleRegister={handleRegister} />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
    </>
  );
};

export default MyNav;
