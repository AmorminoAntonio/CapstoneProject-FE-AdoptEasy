import { Card, Button, Container, Row, Col } from "react-bootstrap";

const AsideBar = () => {
  return (
    <Container>
      <Row>
        <Col className="aside-bar">
          <Card className="my-3">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Card Title 1</Card.Title>
              <Card.Text>Some description for this card.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card className="my-3">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Card Title 2</Card.Title>
              <Card.Text>Some description for this card.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card className="my-3">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Card Title 3</Card.Title>
              <Card.Text>Some description for this card.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AsideBar;
