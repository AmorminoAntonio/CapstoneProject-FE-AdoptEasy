import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image, Card, Spinner } from "react-bootstrap";
import CarouselHomeImg from "./CarouselHomeImg";
import TestimonialCards from "../testimonial/TestimonialCards";
import { Link } from "react-router-dom";
import "./homepageCss.css";

const Homepage = () => {
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
        const availableAnimals = data.content.filter((animal) => animal.status === "ADOPTED");

        setAnimals(availableAnimals.slice(0, 4));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, []);

  const handleClickButton = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      <CarouselHomeImg />

      <Container>
        {/* Intestazione principale */}
        <Row className="mt-5 text-center">
          <Col xs={12}>
            <h1 className="headline">Dona una Nuova Vita a un Amico a Quattro Zampe</h1>
            <p className="intro-text">
              Adottare un animale significa regalargli un futuro migliore. Scopri come puoi fare la differenza e dare una casa a un amico a quattro zampe.
            </p>
          </Col>
        </Row>

        {/* Sezione principale: Storia di noi e citazioni */}
        <Row className="mt-5 justify-content-center text-center mb-5">
          <Col xs={12} sm={10} md={10} lg={10} className="story-card p-4 mb-4">
            <h2>La Nostra Storia</h2>
            <p>
              Il nostro progetto nasce dalla passione e dall'amore per gli animali in cerca di una nuova casa. Crediamo che ogni animale meriti una vita piena
              di amore, attenzione e cura.
            </p>
            <p>Unisciti a noi e scopri come insieme possiamo fare la differenza.</p>
            <Button variant="outline-primary" className="button" as={Link} to="/chisiamo" onClick={handleClickButton}>
              Scopri di più
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Sezione Animali */}
      <Container fluid className="my-3 px-5 bg-success-subtle">
        <Row className="d-flex justify-content-center align-items-center py-5">
          <Col xs={12} sm={12} md={6} lg={4} className="text-center mb-4">
            <h3 className="text-success">L'importanza di Adottare un Animale</h3>
            <p>
              L'adozione di un animale non è solo un gesto di amore, ma anche un'azione che aiuta a ridurre il numero di animali randagi e abbandonati. Molti
              animali in rifugio sono in cerca di una seconda opportunità per una vita migliore.
            </p>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            <Image
              fluid
              className="rounded-4 shadow-lg"
              src="https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFtaWdsaWElMjBjYW5lfGVufDB8MHwwfHx8MA%3D%3D"
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} className="text-center mb-4">
            <h3 className="text-success">Un Gesto che Cambia la Vita</h3>
            <p>
              Adottare un animale significa creare un legame profondo che arricchisce la vita di entrambe le parti. Il cane o il gatto che adotti diventerà il
              tuo compagno fedele, mentre tu farai la differenza nella sua vita.
            </p>
          </Col>
        </Row>
      </Container>
      {/* Sezione come adottare */}
      <Container>
        <Row className="mt-5 text-center justify-content-center align-items-center">
          <Col xs={12} sm={12} md={6} lg={5} className="mb-4">
            <h2>Come Adottare un Animale</h2>
            <p>Adottare un animale è semplice, ma richiede attenzione e responsabilità. Segui questi passi per iniziare:</p>
            <ul className="list-unstyled">
              <li>
                <strong>1. Visita il nostro rifugio o esplora il nostro sito</strong> per trovare il tuo nuovo compagno.
              </li>
              <li>
                <strong>2. Fai una visita di conoscenza</strong> per conoscere l'animale e vedere se è adatto a te.
              </li>
              <li>
                <strong>3. Compila il modulo di adozione</strong> e attendi la nostra risposta.
              </li>
              <li>
                <strong>4. Concludi l'adozione</strong> con la documentazione necessaria e porta il tuo nuovo amico a casa!
              </li>
            </ul>
          </Col>
          <Col xs={12} sm={12} md={6} lg={5} className="mb-4">
            <Image fluid width={500} src="/src/assets/Rifugio per animali `adopt easy`.gif" />
          </Col>
        </Row>
      </Container>

      {/* Sezione Testimonianze */}
      <Container className="p-3 bg-secondary-subtle my-4 rounded shadow">
        <Row>
          <Col xs={12} className="recent-adoptions">
            <h2 className="text-center">Adozioni Recenti</h2>
            <p className="text-center">
              Scopri gli animali che hanno trovato una nuova casa grazie all'amore e alla cura degli adottanti. Unisciti a noi nella missione di aiutare altri
              animali!
            </p>
          </Col>

          {animals.length > 0 ? (
            animals.slice(0, 4).map(
              (
                animal,
                index // Limitiamo a 4 animali
              ) => (
                <Col xs={12} sm={6} md={4} lg={3} xl={3} key={index} className="mb-4">
                  <Card className="adoption-card shadow-lg">
                    <Card.Img height="200" className="animal-img object-fit-cover rounded-top" src={animal.photo} alt={animal.species} />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Title className="text-center">{animal.species}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              )
            )
          ) : (
            <Col xs={12} className="text-center">
              <p>No animals found.</p>
            </Col>
          )}
        </Row>
      </Container>
      <Container className="my-5">
        <Row>
          <Col xs={12}>
            <TestimonialCards className="testimonial-item" />
          </Col>
        </Row>
      </Container>

      {/* Sezione Volontariato e Donazioni */}
      <Container>
        <Row className="d-flex justify-content-around text-center mt-5">
          <Col xs={12} sm={6} md={5} lg={4} xl={4} className="mb-4">
            <h2>Diventa un Volontario</h2>
            <p>
              Se vuoi fare la differenza nella vita degli animali in cerca di una casa, unisciti a noi come volontario! Offri il tuo tempo e il tuo amore agli
              animali bisognosi.
            </p>
            <Button className="button align-items-center" href="/chisiamo">
              <span className="">Scopri come diventare un volontario 🫱🏼‍🫲🏼</span>
            </Button>
          </Col>
          <Col xs={12} sm={6} md={5} lg={4} xl={4} className="mb-4">
            <h2>Sostieni il nostro Rifugio</h2>
            <p>Ogni piccolo gesto può fare la differenza! Sostieni il nostro rifugio con una donazione o acquistando prodotti per i nostri animali.</p>
            <Button className="button lign-items-center" href="#">
              Fai una Donazione ❤️🐶
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
