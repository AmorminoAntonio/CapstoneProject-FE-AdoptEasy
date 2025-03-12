import { Col, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const MyNav = () => {
  return (
    <Navbar sticky="top" expand="lg" className="bg-warning">
      <Container fluid className="mx-5 my-2 py-2">
        <Navbar.Brand as={Link} to="/">
          <span className="me-1">
            ADOPT <br /> EASY
          </span>
          <Image src="https://cdn-icons-png.flaticon.com/128/1076/1076928.png" width={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex align-items-center">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/posts">
              Posts
            </Nav.Link>
            <NavDropdown title="more info" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">sezione 1</NavDropdown.Item>
              <NavDropdown.Item href="#action4">sezione 2</NavDropdown.Item>
              <NavDropdown.Item href="#action3">sezione 3</NavDropdown.Item>
              <NavDropdown.Item href="#action4">sezione 4</NavDropdown.Item>
              <NavDropdown.Item href="#action3">sezione 5</NavDropdown.Item>
              <NavDropdown.Item href="#action4">sezione 6</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#nuovolink">Link</Nav.Link>
          </Nav>
          <Button variant="outline-dark" className="rounded-pill me-1 py-0">
            REGISTER
          </Button>
          <Button variant="outline-dark" className="rounded-pill py-0">
            LOGIN
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
