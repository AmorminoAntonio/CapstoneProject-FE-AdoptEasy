import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const SearchForm = ({ searchSpecies, searchBreed, setSearchSpecies, setSearchBreed, fetchAnimals }) => {
  // Gestione dell'input per species
  const handleSearchSpecies = (e) => {
    setSearchSpecies(e.target.value);
    fetchAnimals(); // Ri-fetch degli animali dopo la modifica
  };

  // Gestione dell'input per breed
  const handleSearchBreed = (e) => {
    setSearchBreed(e.target.value);
    fetchAnimals(); // Ri-fetch degli animali dopo la modifica
  };

  return (
    <Container>
      <Row>
        <Form className="d-flex align-items-center">
          <Col md={3} className="me-3">
            <Form.Group controlId="searchSpecies">
              <Form.Label>Search by Species</Form.Label>
              <Form.Control
                type="text"
                value={searchSpecies}
                onChange={handleSearchSpecies} // Modifica il valore di searchSpecies
                placeholder="Enter animal species"
              />
            </Form.Group>
          </Col>

          <Col md={3} className="">
            <Form.Group controlId="searchBreed">
              <Form.Label>Search by Breed</Form.Label>
              <Form.Control
                type="text"
                value={searchBreed}
                onChange={handleSearchBreed} // Modifica il valore di searchBreed
                placeholder="Enter animal breed"
              />
            </Form.Group>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default SearchForm;
