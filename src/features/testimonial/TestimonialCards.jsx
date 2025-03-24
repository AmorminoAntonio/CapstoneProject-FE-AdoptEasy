import { Container, Row, Col, Card } from "react-bootstrap";
import "./TestimonialCardsCss.css";

const TestimonialCards = () => {
  return (
    <Container className="my-5">
      <Row className="d-flex justify-content-center">
        {/* Colonne responsabili per le card */}
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          {/* Card 1 */}
          <Card className="testimonial-card">
            <Card.Body>
              <Card.Text>"Adottare Fido è stata una delle decisioni migliori della mia vita. È diventato il mio compagno fedele."</Card.Text>
              <Card.Text>- Laura, 28 anni</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          {/* Card 2 */}
          <Card className="testimonial-card">
            <Card.Body>
              <Card.Text>"Abbiamo adottato Micia da un rifugio e non potremmo essere più felici. È così affettuosa!"</Card.Text>
              <Card.Text>- Marco, 35 anni</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          {/* Card 3 */}
          <Card className="testimonial-card">
            <Card.Body>
              <Card.Text>"L'adozione di un cane ha cambiato la mia vita. È il mio amico più sincero."</Card.Text>
              <Card.Text>- Anna, 42 anni</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TestimonialCards;
