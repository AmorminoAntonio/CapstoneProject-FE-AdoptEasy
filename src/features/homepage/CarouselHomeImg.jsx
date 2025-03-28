import { Carousel, Container, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CarouselHomeImg = () => {
  return (
    <Carousel className="text-center">
      <Carousel.Item>
        <Image
          className="w-100 object-fit-cover"
          src="https://images.unsplash.com/photo-1554456854-55a089fd4cb2?w=550&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhbmV8ZW58MHwwfDB8fHww"
          height={550}
          alt="Primo"
        />
        <Carousel.Caption className="d-none d-md-block">
          <h3>"Adottare è un atto d'amore."</h3>
          <p>"Ogni adozione è un cuore che si riempie di gratitudine e speranza."</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className=" w-100 object-fit-cover"
          src="https://plus.unsplash.com/premium_photo-1661344237259-29918374fb74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGxhYnJhZG9yfGVufDB8MHwwfHx8MA%3D%3D"
          height={550}
          alt="Secondo"
        />
        <Carousel.Caption className="d-none d-md-block">
          <h3>"Un amico peloso è un cuore che batte vicino al tuo."</h3>
          <p>"Con ogni adozione, un animale trova una famiglia. Con ogni famiglia, un animale trova un amico per la vita."</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className=" w-100 object-fit-cover"
          src="https://images.unsplash.com/photo-1597595735637-05a49627ee29?w=550&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNhbmUlMjBpbiUyMGZhbWlnbGlhfGVufDB8MHwwfHx8MA%3D%3D"
          height={550}
          alt="Terzo"
        />
        <Carousel.Caption className="d-none d-md-block">
          <h3>"I sorrisi di famiglia iniziano con una coda che scodinzola."</h3>
          <p>"Gli animali riempiono la casa di amore, risate e affetto incondizionato. Una famiglia senza un animale manca di qualcosa di speciale."</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHomeImg;
