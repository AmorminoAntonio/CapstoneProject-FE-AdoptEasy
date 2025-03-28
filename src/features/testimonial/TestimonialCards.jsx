import { Container, Row, Col, Card, Carousel } from "react-bootstrap";

const TestimonialCards = () => {
  return (
    <Container className="my-2 pb-5">
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <h2 className="text-center mb-4">Le nostre Testimonianze</h2>
          <Carousel interval={5000} className="testimonial-carousel shadow">
            {/* Primo Item */}
            <Carousel.Item>
              <Card className="testimonial-card p-4 bg-primary-subtle">
                <Card.Body>
                  <Card.Text>Adottare Fido è stata una delle decisioni migliori della mia vita. È diventato il mio compagno fedele.</Card.Text>
                  <Card.Text className="text-end">- Laura, 28 anni</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Secondo Item */}
            <Carousel.Item>
              <Card className="testimonial-card p-4 bg-primary-subtle">
                <Card.Body>
                  <Card.Text>Abbiamo adottato Micia da un rifugio e non potremmo essere più felici. È così affettuosa!</Card.Text>
                  <Card.Text className="text-end">- Marco, 35 anni</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Terzo Item */}
            <Carousel.Item>
              <Card className="testimonial-card p-4 bg-primary-subtle">
                <Card.Body>
                  <Card.Text>L'adozione di un cane ha cambiato la mia vita. È il mio amico più sincero.</Card.Text>
                  <Card.Text className="text-end">- Anna, 42 anni</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Quarto Item */}
            <Carousel.Item>
              <Card className="testimonial-card p-4 bg-primary-subtle">
                <Card.Body>
                  <Card.Text>Il mio cane è la cosa migliore che mi sia mai successa. L'adozione mi ha cambiato la vita.</Card.Text>
                  <Card.Text className="text-end">- Giulia, 29 anni</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Quinto Item */}
            <Carousel.Item>
              <Card className="testimonial-card p-4 bg-primary-subtle">
                <Card.Body>
                  <Card.Text>Mia sorella ha adottato una gatta ed è fantastica! È diventata parte della nostra famiglia.</Card.Text>
                  <Card.Text className="text-end">- Luca, 33 anni</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Sesto Item */}
            <Carousel.Item>
              <Card className="testimonial-card p-4 bg-primary-subtle">
                <Card.Body>
                  <Card.Text>Adottare un cane è stato un atto di amore che ci ha uniti ancora di più come famiglia.</Card.Text>
                  <Card.Text className="text-end">- Stefania, 37 anni</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Settimo Item */}
            <Carousel.Item>
              <Card className="testimonial-card p-4 bg-primary-subtle">
                <Card.Body>
                  <Card.Text>La nostra esperienza con l'adozione è stata straordinaria, il nostro cane è un membro amato della famiglia.</Card.Text>
                  <Card.Text className="text-end">- Paolo, 44 anni</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Ottavo Item */}
            <Carousel.Item>
              <Card className="testimonial-card p-4 bg-primary-subtle">
                <Card.Body>
                  <Card.Text>Adottare un animale è stata la decisione migliore per il mio cuore e la mia casa.</Card.Text>
                  <Card.Text className="text-end">- Alessandra, 38 anni</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>

            {/* Nono Item */}
            <Carousel.Item>
              <Card className="testimonial-card p-4 bg-primary-subtle">
                <Card.Body>
                  <Card.Text>Con il nostro cane siamo diventati una vera famiglia. Non possiamo immaginare la vita senza di lui.</Card.Text>
                  <Card.Text className="text-end">- Giorgio, 41 anni</Card.Text>
                </Card.Body>
              </Card>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default TestimonialCards;
