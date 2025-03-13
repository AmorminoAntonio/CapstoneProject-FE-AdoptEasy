import { Container, Row, Col, Card, Button, Carousel, Image } from "react-bootstrap";
import CarouselHomeImg from "./CarouselHomeImg";
import Marquee from "react-fast-marquee";
import CarouselBottomHome from "./CarouselBottomHome";

const Homepage = () => {
  /* qui devo inserire la logica e le chiamate per popolare la pagina iniziale del sito */

  return (
    <>
      <CarouselHomeImg />
      <Container className="">
        {/* Intestazione principale */}
        <Row className="mt-3 text-center">
          <Col>
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
        <Row md={3} className="mt-5 mb-5 justify-content-center">
          <Col>
            <CarouselBottomHome />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
