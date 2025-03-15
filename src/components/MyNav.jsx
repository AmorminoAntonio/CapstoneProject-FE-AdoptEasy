import { Col, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import RegisterModal from "../features/RegisterModal";
import { useState, useEffect } from "react";
import LoginModal from "../features/LoginModal";
import { jwtDecode } from "jwt-decode";

const MyNav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null); // Stato che tiene traccia dell'utente loggato
  const [role, setRole] = useState(null); // Stato per il ruolo

  // Funzione di gestione per login
  const handleLogin = (response) => {
    console.log("Risposta ricevuta:", response); // Visualizza l'oggetto completo
    // Verifica che la risposta abbia un campo token
    if (response && response.token) {
      const token = response.token; // Estrai il token dalla risposta
      if (typeof token === "string") {
        try {
          const decodedToken = jwtDecode(token); // Decodifica il token
          console.log("Token decodificato:", decodedToken); // Verifica il contenuto del token
          setUser(decodedToken); // Imposta i dati dell'utente
          setRole(decodedToken.roles); // Imposta il ruolo
          localStorage.setItem("authToken", token); // Salva il token nel localStorage
        } catch (error) {
          console.error("Errore nella decodifica del token:", error);
        }
      } else {
        console.error("Il token non è una stringa valida:", token); // Log dettagliato
      }
    } else {
      console.error("La risposta non contiene un token valido", response);
    }
  };

  const handleLogout = () => {
    setUser(null); // Logout
    setRole(null); // Rimuove anche il ruolo
    localStorage.removeItem("authToken"); // Rimuove il token da localStorage
  };

  const handleRegister = (userData) => {
    setUser(userData); // Registrazione completata, setta l'utente
    setRole(userData.role); // Imposta il ruolo dell'utente
  };

  useEffect(() => {
    // Verifica se c'è un token salvato in locale
    const token = localStorage.getItem("authToken");

    if (token) {
      console.log("Token recuperato da localStorage:", token);

      // Decodifica il token solo se è una stringa valida
      if (typeof token === "string") {
        try {
          const decodedToken = jwtDecode(token);
          console.log("Token decodificato dal localStorage:", decodedToken); // Verifica il contenuto del token
          setUser(decodedToken);
          setRole(decodedToken.roles); // Estrae il ruolo dal token
        } catch (error) {
          console.error("Errore nella decodifica del token da localStorage:", error);
        }
      } else {
        console.error("Il token in localStorage non è una stringa:", token);
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
      <Navbar sticky="top" expand="lg" className="bg-secondary-subtle">
        <Container>
          <Row>
            <Col className="d-flex">
              <Navbar.Brand as={Link} to="/">
                <Image src="/src/assets/ADOPT EASY (1).svg" width={100} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "250px" }} navbarScroll>
                  <Nav.Link className="fw-semibold" as={Link} to="/homepage">
                    HOME
                  </Nav.Link>
                  <Nav.Link className="fw-semibold" as={Link} to="/album-4zampe">
                    ALBUM ADOZIONI
                  </Nav.Link>
                  <Nav.Link className="fw-semibold" as={Link} to="/ChiSiamo">
                    CHI SIAMO
                  </Nav.Link>
                  <NavDropdown className="fw-semibold" title="LE NOSTRE SEDI" id="navbarScrollingDropdown">
                    <NavDropdown.Item className="fw-semibold" href="#action3">
                      RIFUGIO "LA ROSA"
                    </NavDropdown.Item>
                    <NavDropdown.Item className="fw-semibold" href="#action4">
                      LA CASCINA SANARIA
                    </NavDropdown.Item>
                    <NavDropdown.Item className="fw-semibold" href="#action3">
                      RIFUGIO "IL CEDRO"
                    </NavDropdown.Item>
                    <NavDropdown.Item className="fw-semibold" href="#action4">
                      IL GATTILE SANITARIO
                    </NavDropdown.Item>
                    <NavDropdown.Item className="fw-semibold" href="#action3">
                      IL CANILE SANITARIO
                    </NavDropdown.Item>
                    <NavDropdown.Item className="fw-semibold" href="#action4">
                      CASCINA "LISONDRIA"
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link className="fw-semibold" as={Link} to="/posts">
                    EVENTI
                  </Nav.Link>
                  <Nav.Link className="fw-semibold" as={Link} to="/contattaci">
                    CONTATTACI
                  </Nav.Link>

                  {/* Mostra il link "BackOffice" solo per ADMIN o VOLUNTEER */}
                  {role && (role === "ADMIN" || role === "VOLUNTEER") && (
                    <Nav.Link className="fw-semibold" as={Link} to="/backoffice">
                      BackOffice
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
          <Row>
            <Col>
              {!user ? (
                <>
                  <Button variant="outline-dark" onClick={() => setShowRegister(true)}>
                    Registrati
                  </Button>
                  <Button variant="outline-dark" onClick={() => setShowLogin(true)}>
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <span>Benvenuto, {user.sub}!</span> {/* Visualizza l'username dal payload */}
                  <Button variant="outline-dark" className="ms-4" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>
      <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} handleRegister={handleRegister} />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
    </>
  );
};

export default MyNav;
