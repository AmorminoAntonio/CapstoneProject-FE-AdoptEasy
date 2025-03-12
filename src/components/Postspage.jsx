import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Accordion, Button } from "react-bootstrap";

const Postspage = () => {
  const [animals, setAnimals] = useState([]); // Inizializza come array vuoto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjU0NTRsaW8iLCJyb2xlcyI6IkFETUlOIiwiZXhwIjoxNzQxODA3NTg2fQ._uw8uH2GcbBeBXOSpwcHcINijadjor-YvGE0zHnB0Xg"; // Sostituisci con il tuo token
        const response = await fetch("http://localhost:8080/admin/animal/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Verifica che 'content' sia un array e settalo nello stato
        if (Array.isArray(data.content)) {
          setAnimals(data.content);
        } else {
          throw new Error("Received data.content is not an array");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="mt-5 m-auto">
      <h1 className="text-center mb-1">I nostri amici a 4 zampe 🐾🐶</h1>
      <Row>
        {animals.length > 0 ? (
          animals.map((animal, index) => (
            <Col md={3} key={index}>
              <Card className="my-4">
                <Card.Img className="rounded-bottom-0 rounded-top" src={animal.photo} />
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title className="text-center">{animal.species}</Card.Title>
                  <Card.Text>
                    <Accordion defaultActiveKey="1">
                      <Accordion.Item>
                        <Accordion.Header>Vedi dettagli</Accordion.Header>
                        <Accordion.Body>
                          <strong>Razza:</strong> {animal.breed} <br />
                          <strong>Lougo del ritrovamento:</strong> {animal.foundLocation} <br />
                          <strong>Data del ritrovamento:</strong> {animal.foundDate} <br />
                          <strong>Data de:</strong> {animal.availableSince} <br />
                          <strong>Description:</strong> {animal.description} <br />
                          <strong>Observation:</strong> {animal.observation}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Button className="mb-0 mt-3 py-1 rounded-pill">Adottami</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No animals found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Postspage;
