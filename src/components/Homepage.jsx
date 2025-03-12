import { Container, Row, Col, Card, Button, Carousel, Image } from "react-bootstrap";

const Homepage = () => {
  /* qui devo inserire la logica e le chiamate per popolare la pagina iniziale del sito */

  return (
    <>
      <Container>
        {/* Intestazione principale */}
        <Row className="mt-5 text-center">
          <Col>
            <Image className="rounded-circle" src="/src/assets/EASY (1).png" width={150} />
            <h1>Dona una Nuova Vita a un Amico a Quattro Zampe</h1>
            <p>Adottare un animale significa regalargli un futuro migliore. Scopri come puoi fare la differenza e dare una casa a un amico a quattro zampe.</p>
          </Col>
        </Row>

        {/* Sezione principale: Storia di noi e citazioni */}
        <Row md={2} className="mt-5 justify-content-center text-center mb-5">
          <Col className="border-2 border rounded-4 p-4">
            <h2>La Nostra Storia</h2>
            <p>
              Il nostro progetto nasce dalla passione e dall'amore per gli animali in cerca di una nuova casa. Siamo un gruppo di persone unite dall'obiettivo
              di dare una seconda opportunità a tutti gli animali che, a causa di circostanze impreviste, si ritrovano senza una famiglia. Crediamo che ogni
              animale meriti una vita piena di amore, attenzione e cura.
            </p>
            <p>
              Con il nostro impegno, ci proponiamo di sensibilizzare la comunità sull'importanza dell'adozione responsabile e offrire una piattaforma che renda
              il processo il più semplice e sicuro possibile.
            </p>
            <p>
              Ogni animale ha una storia e ogni adozione è un passo importante. Unisciti a noi in questo percorso, perché insieme possiamo fare la differenza.
            </p>
          </Col>
        </Row>

        <Container className="my-5">
          <Row>
            <Col md={6}>
              <h3>L'importanza di Adottare un Animale</h3>
              <p>
                L'adozione di un animale non è solo un gesto di amore, ma anche un'azione che aiuta a ridurre il numero di animali randagi e abbandonati. Molti
                animali in rifugio sono in cerca di una seconda opportunità per una vita migliore.
              </p>
              <p>
                Adottando un animale, non solo gli offri una casa sicura, ma contribuisci anche a promuovere il benessere degli animali e a sensibilizzare la
                comunità sull'importanza di trattare gli animali con rispetto e cura.
              </p>
            </Col>
            <Col md={6}>
              <h3>Un Gesto che Cambia la Vita</h3>
              <p>
                Adottare un animale significa creare un legame profondo che arricchisce la vita di entrambe le parti. Il cane o il gatto che adotti diventerà il
                tuo compagno fedele, mentre tu farai la differenza nella sua vita.
              </p>
              <p>
                Ogni adozione è una vittoria contro l'abbandono e la sofferenza, e ti dà la possibilità di contribuire a costruire una società più
                compassionevole.
              </p>
            </Col>
          </Row>
        </Container>

        {/* Sezione Citazioni e aforismi con Carosello */}
        <Row md={2} className="mt-5 mb-5 justify-content-center">
          <Col>
            <Carousel>
              {/* Primo Item del Carosello */}
              <Carousel.Item>
                <Card className="text-center">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>“Non sono gli animali a salvarci, ma siamo noi a salvarli.”</p>
                      <footer className="blockquote-footer">
                        Cit. <cite title="Source Title">- Anonimo</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              {/* Secondo Item del Carosello */}
              <Carousel.Item>
                <Card className="text-center">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>“Il miglior amico dell'uomo non è quello che ti sta accanto, ma quello che ti aspetta a casa con amore incondizionato.”</p>
                      <footer className="blockquote-footer">
                        Cit. <cite title="Source Title">- Anonimo</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              {/* Terzo Item del Carosello */}
              <Carousel.Item>
                <Card className="text-center">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>“Adottare un animale significa salvare due vite: quella dell'animale e la tua.”</p>
                      <footer className="blockquote-footer">
                        Cit. <cite title="Source Title">- Anonimo</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Carousel.Item>
              <Carousel.Item>
                <Card className="text-center">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>“Ogni animale che salva una vita, salva anche la nostra.”</p>
                      <footer className="blockquote-footer">
                        Cit. <cite title="Source Title">– Anonimo</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card className="text-center">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>“Gli animali non sono proprietà, ma compagni di vita.”</p>
                      <footer className="blockquote-footer">
                        Cit. <cite title="Source Title">– Unknown</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card className="text-center">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>“La felicità è una coda che scodinzola.”</p>
                      <footer className="blockquote-footer">
                        Cit. <cite title="Source Title">– Anonimo</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card className="text-center">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>“Un animale adottato è un cuore che batte più forte.”</p>
                      <footer className="blockquote-footer">
                        Cit. <cite title="Source Title">– Anonimo</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card className="text-center">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>“Quando adotti un animale, non lo salvi solo tu, ma anche lui salva te.”</p>
                      <footer className="blockquote-footer">
                        Cit. <cite title="Source Title">– Anonimo</cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
