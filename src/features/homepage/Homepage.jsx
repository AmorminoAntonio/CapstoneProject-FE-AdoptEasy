import { Container, Row, Col, Card, Button, Carousel, Image } from "react-bootstrap";

import CarouselHomeImg from "../CarouselHomeImg";
import TestimonialCards from "../testimonial/TestimonialCards";

const Homepage = () => {
  return (
    <>
      <CarouselHomeImg />
      <Container>
        {/* Intestazione principale */}
        <Row className="mt-4 text-center">
          <Col>
            <h1>Dona una Nuova Vita a un Amico a Quattro Zampe</h1>
            <p>Adottare un animale significa regalargli un futuro migliore. Scopri come puoi fare la differenza e dare una casa a un amico a quattro zampe.</p>
          </Col>
        </Row>

        {/* Sezione principale: Storia di noi e citazioni */}
        <Row className="mt-5 text-center mb-5">
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

        {/* Sezione come adottare */}
        <Row className="mt-5 text-center">
          <Col>
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
        </Row>

        {/* Storie di adozione */}
        <Row className="mt-5 text-center">
          <Col>
            <h2>Le Nostre Storie di Adozione</h2>
            <p>
              Leggi alcune delle storie di successo dei nostri animali adottati e scopri come l'adozione ha cambiato la loro vita e quella dei loro nuovi
              proprietari.
            </p>
            <Button variant="primary" href="/storie-adozione">
              Scopri le Storie
            </Button>
          </Col>
        </Row>

        {/* Domande frequenti */}
        <Row className="mt-5 text-center">
          <Col>
            <h2>Domande Frequenti (FAQ)</h2>
            <p>Hai domande sull'adozione? Dai un'occhiata alle domande frequenti per trovare risposte ai tuoi dubbi.</p>
            <Button variant="info" href="/faq">
              Leggi le FAQ
            </Button>
          </Col>
        </Row>

        {/* Sezione Testimonianze */}
        <TestimonialCards />

        {/* Sezione Animali */}
        <Container className="my-5">
          <Row>
            <Col xs={12} md={6}>
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
            <Col xs={12} md={6}>
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

          {/* Adozioni Recenti */}
          <Row className="mt-5">
            <Col>
              <h2>Adozioni Recenti</h2>
              <p>Dai un'occhiata agli animali recentemente adottati! Siamo felici di vedere tanti animali trovare una nuova casa.</p>
              <Carousel>
                {/* Ogni Item nel carosello potrebbe mostrare un'adozione recente */}
                <Carousel.Item>
                  <Image src="recent_adoption_1.jpg" alt="Adottato" fluid />
                  <Carousel.Caption>
                    <h3>Cane Max</h3>
                    <p>Max è stato adottato dopo un lungo periodo di attesa. Ora è felice con la sua nuova famiglia!</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Image src="recent_adoption_2.jpg" alt="Adottato" fluid />
                  <Carousel.Caption>
                    <h3>Gatto Mia</h3>
                    <p>Mia è stata adottata da una famiglia amorevole. Finalmente ha trovato il suo posto nel mondo!</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>

          {/* Diventa Volontario */}
          <Row className="mt-5 text-center">
            <Col>
              <h2>Diventa un Volontario</h2>
              <p>
                Se vuoi fare la differenza nella vita degli animali in cerca di una casa, unisciti a noi come volontario! Offri il tuo tempo e il tuo amore agli
                animali bisognosi.
              </p>
              <Button variant="success" href="/volontariato">
                Scopri come diventare un volontario
              </Button>
            </Col>
          </Row>

          {/* Sostieni il Rifugio */}
          <Row className="mt-5 text-center">
            <Col>
              <h2>Sostieni il Nostro Rifugio</h2>
              <p>Ogni piccolo gesto può fare la differenza! Sostieni il nostro rifugio con una donazione o acquistando prodotti per i nostri animali.</p>
              <Button variant="danger" href="/donazioni">
                Fai una Donazione
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Homepage;
