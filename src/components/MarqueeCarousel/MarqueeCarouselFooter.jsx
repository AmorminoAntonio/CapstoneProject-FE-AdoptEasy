import { Image } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import "./MarqueeCarouselFooterCss.css";

const MarqueeCarouselFooter = () => {
  return (
    <Marquee speed={20} className=" mb-1 mt-5">
      <div className="marquee-item-container">
        <Image
          fluid
          className="marquee-image"
          src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2F2aWF8ZW58MHwwfDB8fHww"
          alt="image1"
        />
        <Image
          fluid
          className="marquee-image"
          src="https://plus.unsplash.com/premium_photo-1681881250121-ad3538d0169a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFicmFkb3J8ZW58MHwwfDB8fHww"
          alt="image2"
        />
        <Image
          fluid
          className="marquee-image"
          src="https://plus.unsplash.com/premium_photo-1665296634267-9a8b78a7579a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGphY2slMjBydXNzZWx8ZW58MHwwfDB8fHww"
          alt="image3"
        />
        <Image
          fluid
          className="marquee-image"
          src="https://images.unsplash.com/photo-1634139270729-0d028b8ac310?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGdhdHRvJTIwZ2lvY2F8ZW58MHwwfDB8fHww"
          alt="image4"
        />
        <Image
          fluid
          className="marquee-image"
          src="https://images.unsplash.com/photo-1589130674510-6dadfc8a1266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNyaWNldG98ZW58MHwwfDB8fHww"
          alt="image5"
        />
        <Image
          fluid
          className="marquee-image"
          src="https://images.unsplash.com/photo-1625831980104-eb5286ab78ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRhcnRhcnVnaGluYXxlbnwwfDB8MHx8fDA%3D"
          alt="image6"
        />
        <Image
          fluid
          className="marquee-image"
          src="https://images.unsplash.com/photo-1582462232426-15df92a418b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHByb2Npb25lfGVufDB8MHwwfHx8MA%3D%3D"
          alt="image7"
        />
      </div>
    </Marquee>
  );
};

export default MarqueeCarouselFooter;
