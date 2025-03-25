import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./ChiSiamo.css"; // Importiamo il file CSS personalizzato

const ChiSiamo = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4 text-primary">Chi Siamo</h2>

      {/* Missione */}
      <Row className="d-flex justify-content-around align-items-center mb-5 p-5 missione">
        <Col md={5}>
          <Image
            fluid
            alt="Missione"
            width={500}
            className="rounded shadow mb-4"
            src="https://images.unsplash.com/photo-1553434133-96822a8e94af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZGFnaXxlbnwwfDB8MHx8fDA%3D"
          />
        </Col>
        <Col md={5}>
          <h3 className="">La nostra missione</h3>
          <p className="fs-5">
            Siamo un’associazione di amanti degli animali che si dedica con passione e impegno a cambiare la vita degli animali randagi. Ogni giorno, ci
            impegniamo a raccogliere e prenderci cura di cani e gatti che vivono nelle strade, donando loro una seconda possibilità. Il nostro obiettivo è dare
            a ogni animale il diritto di vivere una vita piena di amore, sicurezza e tranquillità, lontano dalla sofferenza e dall'abbandono.
          </p>
        </Col>
      </Row>

      {/* Ogni animale merita una seconda opportunità */}
      <Row className="mb-5 p-5 seconda-opportunita">
        <Col>
          <h3 className="">Ogni animale merita una seconda opportunità</h3>
          <p>
            Siamo convinti che ogni animale, grande o piccolo, meriti una seconda possibilità. Ogni cane, ogni gatto che riesce a trovare una nuova famiglia,
            riesce a scrivere una nuova storia di felicità e amore. Ogni adozione è una vittoria, non solo per l'animale, ma anche per le persone che decidono
            di aprire il cuore e la propria casa.
          </p>
        </Col>
      </Row>

      {/* Impegno */}
      <Row className="align-items-center p-5 mb-5 impegno">
        <Col md={6}>
          <h3 className="">Il nostro impegno</h3>
          <p>
            Non si tratta solo di trovare una casa temporanea per questi animali. Il nostro scopo è far sì che ogni adozione sia una scelta consapevole, che
            porti alla formazione di legami forti e duraturi tra gli animali e le loro nuove famiglie. Ogni animale che accoglie il nostro rifugio è trattato
            con cura, amore e attenzione.
          </p>
        </Col>
        <Col md={6}>
          <Image
            fluid
            width={600}
            className="rounded shadow"
            src="https://plus.unsplash.com/premium_photo-1663063203452-70eb1617ea11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1pY2klMjBhbmltYWxpfGVufDB8MHwwfHx8MA%3D%3D"
          />
        </Col>
      </Row>

      {/* Adozione consapevole */}
      <Row className="mb-5 p-5 adozione-consapevole">
        <Col>
          <h3 className="">Adozione consapevole: un passo importante</h3>
          <p>
            Crediamo fermamente che ogni adozione debba essere il risultato di una scelta consapevole. Non vogliamo solo dare un tetto a un animale, ma
            garantire che ogni famiglia sia preparata a prendersi cura di lui nel lungo periodo. Per questo, offriamo supporto continuo alle famiglie adottive,
            offrendo consigli su come affrontare l’integrazione dell’animale nella nuova casa e aiutando a risolvere eventuali difficoltà che potrebbero sorgere
            durante il processo di adattamento.
          </p>
        </Col>
      </Row>

      {/* Rete di Supporto */}
      <Row className="d-flex justify-content-around align-items-center mb-5 p-5 rete-supporto">
        <Col md={5}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2bvWUQCud4_fEyoF5N_OsTbTBNVhyxaPLQ&s"
            width={600}
            alt="Rete di supporto"
            className="img-fluid rounded shadow mb-4"
          />
        </Col>
        <Col md={5}>
          <h3 className="fs-2 mb-4">La nostra rete di supporto</h3>
          <p className="fs-5">
            Siamo una rete di volontari, rifugi, veterinari e altre organizzazioni che collaborano per garantire un futuro migliore agli animali. Lavoriamo
            insieme per raccogliere, curare e preparare gli animali per le adozioni, supportando ogni passo del processo con professionalità e amore.
          </p>
        </Col>
      </Row>

      {/* La comunità che costruiamo */}
      <Row className="mb-5 p-5 comunita">
        <Col>
          <h3 className="">La comunità che costruiamo</h3>
          <p>
            La nostra visione va oltre la semplice adozione: vogliamo costruire una comunità di persone consapevoli e responsabili, che sappiano come prendersi
            cura degli animali e come contribuire al loro benessere. Organizziamo eventi, attività educative e campagne di sensibilizzazione per coinvolgere
            quante più persone possibile nella nostra causa.
          </p>
        </Col>
      </Row>

      {/* Unisciti a noi */}
      <Row className="text-center p-5 unisciti">
        <Col>
          <h3 className="">Unisciti a noi</h3>
          <p>
            La nostra missione non finisce mai. Ogni giorno, cerchiamo di fare la differenza, aiutando gli animali randagi e educando la comunità. Se anche tu
            credi che ogni vita meriti una chance, unisciti a noi! Sostieni la nostra causa, adotta un animale, diffondi la voce, e contribuisci a rendere il
            mondo un posto migliore per tutti.
          </p>
          <Button variant="success" size="lg" className="mt-3">
            Unisciti a noi!
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChiSiamo;
