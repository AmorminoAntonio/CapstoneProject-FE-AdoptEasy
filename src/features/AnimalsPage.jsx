import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Accordion, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await fetch("http://localhost:8080/adopter/animal/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const availableAnimals = data.content.filter((animal) => animal.status !== "ADOPTED");

        setAnimals(availableAnimals);
        console.log(availableAnimals);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <Spinner animation="border" className="text-primary" />
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="text-center mb-1 mt-5">🐾 I nostri amici pelosi.</h1>
      <Container>
        <Row md={4} className="d-flex flex-wrap mt-4 gy-4">
          {animals.length > 0 ? (
            animals.map((animal, index) => (
              <Col md={3} key={index}>
                <Card className="shadow-lg">
                  <Card.Img height={200} className="object-fit-cover rounded-top rounded-bottom-0" src={animal.photo} />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="text-center">{animal.species}</Card.Title>
                    <Col>
                      <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Scopri di più</Accordion.Header>
                          <Accordion.Body>
                            <strong>Razza:</strong> {animal.breed} <br />
                            <strong>Luogo del ritrovamento:</strong> {animal.foundLocation} <br />
                            <strong>Data del ritrovamento:</strong> {animal.foundDate} <br />
                            <strong>Data disponibile per l'adozione:</strong> {animal.availableSince} <br />
                            <strong>Descrizione:</strong> {animal.description} <br />
                            <strong>Osservazioni post ritrovamento:</strong> {animal.observation}
                            <Button as={Link} to={"/contattaci"} className="mt-auto py-1">
                              richiedi appuntamento
                            </Button>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No animals found.</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AnimalsPage;
