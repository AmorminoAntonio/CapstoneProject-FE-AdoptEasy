import { Col, Image, Row, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import RegisterModal from "../RegisterModal";
import { useState, useEffect } from "react";
import LoginModal from "../LoginModal";
import { jwtDecode } from "jwt-decode";
import { Toast, ToastContainer } from "react-bootstrap";
import "./MyNavCSS.css";

const MyNav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [expanded, setExpanded] = useState(false); // qui faccio chiudere il toggle dopo il click link

  const navigate = useNavigate();

  const showMessage = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleLogin = (response) => {
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
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("authToken");
    showMessage("Logout avvenuto con successo", "success");
    navigate("/homepage");
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

          const expirationTime = decodedToken.exp * 1000;
          const currentTime = Date.now();

          if (currentTime > expirationTime) {
            handleLogout();
            showMessage("Token scaduto. Eseguito il logout automaticamente.", "warning");
          }
        } catch (error) {
          console.error("Errore nella decodifica del token da localStorage:", error);
        }
      }
    }
  }, [navigate]);

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  return (
    <>
      <Container fluid className="banner">
        <Row className="text-center text-bg-primary pt-2">
          <Col>
            <h6 className="fw-lighter">
              <span className="fw-bold">ADOPT EASY</span> Associazione Tutela Animali - Sede legale: S.P Pavia n°36 - Valmadonna(ALESSANDRIA)
            </h6>
          </Col>
        </Row>
      </Container>
      <Navbar sticky="top" expand="lg" className="navbar-custom shadow-lg" expanded={expanded}>
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick}>
            <Image src="/src/assets/ADOPT EASY (1).svg" width={130} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex align-items-center">
              <Nav.Link className="nav-link-custom" as={Link} to="/homepage" onClick={handleNavLinkClick}>
                HOME
              </Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/album-4zampe" onClick={handleNavLinkClick}>
                ALBUM ADOZIONI
              </Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/ChiSiamo" onClick={handleNavLinkClick}>
                CHI SIAMO
              </Nav.Link>
              <NavDropdown className="dropdown-item-custom-padre" title="LE NOSTRE SEDI" id="navbarScrollingDropdown">
                <NavDropdown.Item className="dropdown-item-custom" href="#action3" onClick={handleNavLinkClick}>
                  RIFUGIO "LA ROSA"
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action4" onClick={handleNavLinkClick}>
                  LA CASCINA SANARIA
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action3" onClick={handleNavLinkClick}>
                  RIFUGIO "IL CEDRO"
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action4" onClick={handleNavLinkClick}>
                  IL GATTILE SANITARIO
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action3" onClick={handleNavLinkClick}>
                  IL CANILE SANITARIO
                </NavDropdown.Item>
                <NavDropdown.Item className="dropdown-item-custom" href="#action4" onClick={handleNavLinkClick}>
                  CASCINA "LISONDRIA"
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="nav-link-custom" as={Link} to="/posts" onClick={handleNavLinkClick}>
                EVENTI
              </Nav.Link>
              <Nav.Link className="nav-link-custom" as={Link} to="/contattaci" onClick={handleNavLinkClick}>
                CONTATTACI
              </Nav.Link>

              {role && (role === "ADMIN" || role === "VOLUNTEER") && (
                <Nav.Link className="nav-link-custom" as={Link} to="/backoffice" onClick={handleNavLinkClick}>
                  BackOffice
                </Nav.Link>
              )}
            </Nav>
            <div className="d-flex align-items-center">
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
                  <span className="navbar-text">Benvenuto, {user.sub}!</span>
                  <Button variant="outline-dark" className="ms-4 nav-btn" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} handleRegister={handleRegister} />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />

      <ToastContainer className="custom-toast-container" position="top-center">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} bg={toastVariant} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default MyNav;
