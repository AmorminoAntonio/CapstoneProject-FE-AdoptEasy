import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Card, Accordion, Image } from "react-bootstrap";
import { PlusLg, Trash3 } from "react-bootstrap-icons";
import "./BackOffice.css";
import SearchForm from "./modalsCRUD/SearchForm";
import CreateAnimalModal from "./modalsCRUD/CreateAnimalModal";
import EditAnimalModal from "./modalsCRUD/EditAnimalModal";
import DeleteAnimalModal from "./modalsCRUD/DeleteAnimalModal";
import ToastMessage from "./modalsCRUD/ToastMessage";

const BackOffice = () => {
  const [animals, setAnimals] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editAnimal, setEditAnimal] = useState(null);
  const [animalToDelete, setAnimalToDelete] = useState(null);
  const [searchSpecies, setSearchSpecies] = useState("");
  const [searchBreed, setSearchBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [showToast, setShowToast] = useState(false);

  // Token
  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBbnRvQWRtaW4xIiwicm9sZXMiOiJBRE1JTiIsImV4cCI6MTc0MjMzMDUzNn0.PmZ-Bvsgk2q1ysJZglKwDdU3iqw-79L0olJbiu2puPg";

  // Funzione per visualizzare messaggi di toast
  const showMessage = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  // Funzione per recuperare gli animali dal server
  const fetchAnimals = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/animal/all", {
        headers: { Authorization: token },
      });

      const data = await response.json();
      if (response.ok) {
        setAnimals(data.content);
      } else {
        showMessage(`Error fetching animals: ${data.message}`, "danger");
      }
    } catch (e) {
      showMessage("Error fetching animals.", e, "danger");
    }
  };

  // Funzione di filtro per gli animali
  const filterAnimals = () => {
    return animals.filter((animal) => {
      const speciesMatch = animal.species.toLowerCase().includes(searchSpecies.toLowerCase());
      const breedMatch = animal.breed.toLowerCase().includes(searchBreed.toLowerCase());
      return speciesMatch && breedMatch;
    });
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <Container className="container-backoffice  my-4">
      <h2 className="text-center">BACK OFFICE - Animal/Adoption/Event Management</h2>

      {/* Search Form */}
      <Row>
        <Col md={8}>
          <SearchForm
            searchSpecies={searchSpecies}
            searchBreed={searchBreed}
            setSearchSpecies={setSearchSpecies}
            setSearchBreed={setSearchBreed}
            fetchAnimals={fetchAnimals}
            token={token}
            setLoading={setIsLoading}
            showMessage={showMessage}
          />
        </Col>
        <Col md={4} className="d-flex justify-content-end">
          {/* Create New Animal Button */}
          <Button variant="success" className="d-flex align-items-center" onClick={() => setShowCreateModal(true)}>
            <strong>Add New Animal</strong>
            <PlusLg className="ms-2" />
          </Button>
        </Col>
      </Row>

      {/* Accordion for Animal List */}
      <Accordion className="mt-4 accordion-flush">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Animals List</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover responsive size="sm" variant="light" className="">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Breed</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterAnimals().map((animal) => (
                  <tr key={animal.id}>
                    <td className="d-flex align-items-center p-0">
                      <div className="animal-image-container">
                        <Image src={animal.photo || "https://via.placeholder.com/100"} alt={animal.species} className="animal-image" />
                      </div>
                      <strong>{animal.species}</strong>
                    </td>
                    <td>{animal.breed}</td>
                    <td>{animal.description}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => {
                          setEditAnimal(animal);
                          setShowEditModal(true);
                        }}
                        disabled={isLoading}
                      >
                        <strong>Edit</strong>
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          setAnimalToDelete(animal);
                          setShowDeleteModal(true);
                        }}
                        disabled={isLoading}
                      >
                        <Trash3 className="fs-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Modals */}
      <CreateAnimalModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        showMessage={showMessage}
        fetchAnimals={fetchAnimals}
        token={token}
        setLoading={setIsLoading}
      />
      <EditAnimalModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        animal={editAnimal}
        showMessage={showMessage}
        fetchAnimals={fetchAnimals}
        token={token}
        setLoading={setIsLoading}
      />
      <DeleteAnimalModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        animal={animalToDelete}
        showMessage={showMessage}
        fetchAnimals={fetchAnimals}
        token={token}
        setLoading={setIsLoading}
      />

      {/* Toast Message */}
      <ToastMessage show={showToast} message={toastMessage} variant={toastVariant} onClose={() => setShowToast(false)} />
    </Container>
  );
};

export default BackOffice;
