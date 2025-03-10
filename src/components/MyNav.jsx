import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";

const MyNav = () => {
  return (
    <Navbar bg="info" data-bs-theme="dark">
      <Container className="justify-content-between">
        <Image src="../assets/EASY (1).png" />

        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">lavora con noi</Nav.Link>
          <Nav.Link href="#pricing">i nostri centri</Nav.Link>
        </Nav>
        <Button variant="light">LOGIN</Button>
      </Container>
    </Navbar>
  );
};
export default MyNav;
