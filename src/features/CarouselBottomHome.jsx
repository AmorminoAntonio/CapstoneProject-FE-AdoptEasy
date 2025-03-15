import { Card, Carousel } from "react-bootstrap";

const CarouselBottomHome = () => {
  return (
    <>
      <Carousel>
        {/* Primo Item del Carosello */}
        <Carousel.Item>
          <Card className="text-center border-0">
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
          <Card className="text-center border-0">
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
          <Card className="text-center border-0">
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
          <Card className="text-center border-0">
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>“Ogni animale che salva una vita, salva anche la nostra.”</p>
                <footer className="blockquote-footer">
                  Cit. <cite title="Source Title">- Anonimo</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="text-center border-0">
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>“Gli animali non sono proprietà, ma compagni di vita.”</p>
                <footer className="blockquote-footer">
                  Cit. <cite title="Source Title">- Unknown</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="text-center border-0">
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>“La felicità è una coda che scodinzola.”</p>
                <footer className="blockquote-footer">
                  Cit. <cite title="Source Title">- Anonimo</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="text-center border-0">
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>“Un animale adottato è un cuore che batte più forte.”</p>
                <footer className="blockquote-footer">
                  Cit. <cite title="Source Title">- Anonimo</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="text-center border-0">
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>“Quando adotti un animale, non lo salvi solo tu, ma anche lui salva te.”</p>
                <footer className="blockquote-footer">
                  Cit. <cite title="Source Title">- Anonimo</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Carousel.Item>
      </Carousel>
    </>
  );
};
export default CarouselBottomHome;
