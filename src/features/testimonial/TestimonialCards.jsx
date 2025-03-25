import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./TestimonialCardsCss.css";

const TestimonialCards = () => {
  // Array delle testimonianze
  const testimonials = [
    { text: "Adottare Fido è stata una delle decisioni migliori della mia vita. È diventato il mio compagno fedele.", author: "- Laura, 28 anni" },
    { text: "Abbiamo adottato Micia da un rifugio e non potremmo essere più felici. È così affettuosa!", author: "- Marco, 35 anni" },
    { text: "L'adozione di un cane ha cambiato la mia vita. È il mio amico più sincero.", author: "- Anna, 42 anni" },
    { text: "Il mio cane è la cosa migliore che mi sia mai successa. L'adozione mi ha cambiato la vita.", author: "- Giulia, 29 anni" },
    { text: "Mia sorella ha adottato una gatta ed è fantastica! È diventata parte della nostra famiglia.", author: "- Luca, 33 anni" },
    { text: "Adottare un cane è stato un atto di amore che ci ha uniti ancora di più come famiglia.", author: "- Stefania, 37 anni" },
    { text: "La nostra esperienza con l'adozione è stata straordinaria, il nostro cane è un membro amato della famiglia.", author: "- Paolo, 44 anni" },
    { text: "Adottare un animale è stata la decisione migliore per il mio cuore e la mia casa.", author: "- Alessandra, 38 anni" },
    { text: "Con il nostro cane siamo diventati una vera famiglia. Non possiamo immaginare la vita senza di lui.", author: "- Giorgio, 41 anni" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Funzione per cambiare la testimonianza ciclicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="my-5">
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={6} md={4} lg={4} className="mb-4 text-center">
          <Card className="testimonial-card shadow-lg">
            <Card.Body>
              <Card.Text>{testimonials[currentIndex].text}</Card.Text>
              <Card.Text>{testimonials[currentIndex].author}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TestimonialCards;
