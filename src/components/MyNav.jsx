import { Image } from "react-bootstrap";
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
      <Container fluid className="mx-5 my-2">
        <Navbar.Brand href="#">
          <span className="fw-bold">ADOPT EASY</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/posts">
              Posts
            </Nav.Link>
            <NavDropdown title="more info" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">su di noi</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Vuoi diventare volontario ?</NavDropdown.Item>
              <NavDropdown.Item href="#action3">su di noi</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Vuoi diventare volontario ?</NavDropdown.Item>
              <NavDropdown.Item href="#action3">su di noi</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Vuoi diventare volontario ?</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#nuovolink">Link</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-danger">LOGIN</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
