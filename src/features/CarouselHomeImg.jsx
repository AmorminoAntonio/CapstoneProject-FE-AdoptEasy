import { Carousel, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CarouselHomeImg = () => {
  return (
    <Carousel className="text-center">
      <Carousel.Item>
        <Image
          className="w-100 object-fit-cover"
          height={560}
          src="https://images.unsplash.com/photo-1554456854-55a089fd4cb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhbmV8ZW58MHwwfDB8fHww"
          alt="Primo"
        />
        <Carousel.Caption>
          <h3>"Adottare è un atto d'amore."</h3>
          <p>"Ogni adozione è un cuore che si riempie di gratitudine e speranza."</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="w-100 object-fit-cover"
          height={560}
          src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNhbmV8ZW58MHwwfDB8fHww"
          alt="Secondo"
        />
        <Carousel.Caption>
          <h3>"Un amico peloso è un cuore che batte vicino al tuo."</h3>
          <p>"Con ogni adozione, un animale trova una famiglia. Con ogni famiglia, un animale trova un amico per la vita."</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="w-100 object-fit-cover"
          height={560}
          src="https://plus.unsplash.com/premium_photo-1681883553397-0f8517025fff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW5pbWFsZSUyMG9zcGVkYWxlJTIwZXZlbnRvJTIwYmFtYmluaXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Terzo"
        />
        <Carousel.Caption>
          <h3>"I sorrisi di famiglia iniziano con una coda che scodinzola."</h3>
          <p>"Gli animali riempiono la casa di amore, risate e affetto incondizionato. Una famiglia senza un animale manca di qualcosa di speciale."</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHomeImg;
