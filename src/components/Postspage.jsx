import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Postspage = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Animali in Cerca di Casa</h2>
      <Row>
        {/* Card 1 */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D"
            />
            <Card.Body>
              <Card.Title>Fido</Card.Title>
              <Card.Text>Un cane dolcissimo che cerca una famiglia amorevole.</Card.Text>
              <Button variant="primary">Adotta Fido</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2 */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D"
            />
            <Card.Body>
              <Card.Title>Gina</Card.Title>
              <Card.Text>Una gatta affettuosa che ama stare in compagnia.</Card.Text>
              <Button variant="primary">Adotta Gina</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZ3N8ZW58MHx8MHx8fDA%3D"
            />
            <Card.Body>
              <Card.Title>Leo</Card.Title>
              <Card.Text>Un cucciolo di cane giocherellone e pieno di energia!</Card.Text>
              <Button variant="primary">Adotta Leo</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Puoi continuare ad aggiungere altre card come nel tuo esempio */}
      </Row>
    </Container>
  );
};

export default Postspage;
