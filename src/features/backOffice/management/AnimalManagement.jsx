import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Spinner, Row, Col, Image } from "react-bootstrap";
import { DatabaseAdd, PencilSquare, Trash3 } from "react-bootstrap-icons";

const AnimalManagement = ({ handleToastShow }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAnimalModal, setShowAnimalModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [animalToEdit, setAnimalToEdit] = useState(null);
  const [animalToDelete, setAnimalToDelete] = useState(null); // stato per il delete

  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [foundDate, setFoundDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [availableSince, setAvailableSince] = useState("");
  const [photo, setPhoto] = useState("");
  const [foundLocation, setFoundLocation] = useState("");
  const [observation, setObservation] = useState("");

  // Filtri
  const [searchSpecies, setSearchSpecies] = useState("");
  const [searchBreed, setSearchBreed] = useState("");
  const [searchFoundLocation, setSearchFoundLocation] = useState("");
  const [searchFoundDate, setSearchFoundDate] = useState("");

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("authToken");
        const headers = { "Content-Type": "application/json" };
        if (authToken) {
          headers["Authorization"] = `Bearer ${authToken}`;
        }

        const response = await fetch("http://localhost:8080/admin/animal/all", {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Errore nel caricamento degli animali");
        }

        const data = await response.json();
        setAnimals(data.content);
      } catch (error) {
        console.error("Errore nel caricamento degli animali:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  // Gestione dell'invio del modulo
  const handleAnimalSubmit = async (e) => {
    e.preventDefault();

    const animalData = {
      species,
      breed,
      foundDate,
      description,
      status,
      availableSince,
      photo,
      foundLocation,
      observation,
    };

    try {
      const authToken = localStorage.getItem("authToken");
      const headers = { "Content-Type": "application/json" };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      if (animalToEdit && animalToEdit.id) {
        // Modifica animale esistente
        const response = await fetch(`http://localhost:8080/admin/animal/update/${animalToEdit.id}`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(animalData),
        });

        if (!response.ok) {
          throw new Error("Errore nell'aggiornare l'animale");
        }

        const data = await response.json();
        setAnimals(animals.map((animal) => (animal.id === animalToEdit.id ? data : animal)));
        handleToastShow("Animale aggiornato con successo!");
      } else {
        // Crea nuovo animale
        const response = await fetch(`http://localhost:8080/admin/animal/signup`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(animalData),
        });

        if (!response.ok) {
          throw new Error("Errore nell'aggiungere l'animale");
        }

        const data = await response.json();
        setAnimals([...animals, data]);
        handleToastShow("Nuovo animale aggiunto con successo!");
      }

      setShowAnimalModal(false);
      resetAnimalForm();
    } catch (error) {
      handleToastShow("Errore nell'aggiungere o aggiornare l'animale!", error.message, "danger");
    }
  };

  const resetAnimalForm = () => {
    setSpecies("");
    setBreed("");
    setFoundDate("");
    setDescription("");
    setStatus("AVAILABLE");
    setAvailableSince("");
    setPhoto("");
    setFoundLocation("");
    setObservation("");
    setAnimalToEdit(null);
  };

  const handleDeleteAnimal = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const headers = { "Content-Type": "application/json" };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const response = await fetch(`http://localhost:8080/admin/animal/delete/${animalToDelete.id}`, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Errore nell'eliminazione dell'animale");
      }

      setAnimals(animals.filter((animal) => animal.id !== animalToDelete.id));
      handleToastShow("Animale eliminato con successo!");
      setShowDeleteConfirmModal(false);
    } catch (error) {
      handleToastShow("Errore nell'eliminazione dell'animale!", error.message, "danger");
    }
  };

  const handleShowAnimalModal = (animal = null) => {
    if (animal) {
      setAnimalToEdit(animal);
      setSpecies(animal.species);
      setBreed(animal.breed);
      setFoundDate(animal.foundDate);
      setDescription(animal.description);
      setStatus(animal.status);
      setAvailableSince(animal.availableSince);
      setPhoto(animal.photo);
      setFoundLocation(animal.foundLocation);
      setObservation(animal.observation);
    } else {
      resetAnimalForm();
    }
    setShowAnimalModal(true);
  };

  // Funzione per filtrare gli animali in base ai criteri di ricerca
  const filteredAnimals = animals.filter((animal) => {
    return (
      (searchSpecies ? animal.species && animal.species.toLowerCase().includes(searchSpecies.toLowerCase()) : true) &&
      (searchBreed ? animal.breed && animal.breed.toLowerCase().includes(searchBreed.toLowerCase()) : true) &&
      (searchFoundLocation ? animal.foundLocation && animal.foundLocation.toLowerCase().includes(searchFoundLocation.toLowerCase()) : true) &&
      (searchFoundDate ? animal.foundDate === searchFoundDate : true)
    );
  });

  return (
    <>
      <Button variant="outline-success" onClick={() => handleShowAnimalModal()}>
        <span className="d-flex align-items-center">
          <strong>Aggiungi Animale</strong> <DatabaseAdd className="fs-3 ms-2" />
        </span>
      </Button>

      {/* Sezione di ricerca */}
      <Row className="my-3">
        <Col md={3}>
          <Form.Control type="text" placeholder="Cerca Specie" value={searchSpecies} onChange={(e) => setSearchSpecies(e.target.value)} />
        </Col>
        <Col md={3}>
          <Form.Control type="text" placeholder="Cerca Razza" value={searchBreed} onChange={(e) => setSearchBreed(e.target.value)} />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Cerca Posizione Ritrovamento"
            value={searchFoundLocation}
            onChange={(e) => setSearchFoundLocation(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control type="date" value={searchFoundDate} onChange={(e) => setSearchFoundDate(e.target.value)} />
        </Col>
      </Row>

      {/* Tabella degli animali filtrata */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Razza</th>
            <th>Loguo di Ritrovamento</th>
            <th>Data di Ritrovamento</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="text-center" colSpan="4">
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
          ) : (
            filteredAnimals.map((animal) => (
              <tr key={animal.id}>
                <td>
                  <Image src={animal.photo} width={50} className="rounded me-2" alt="" />
                  {animal.species}
                </td>
                <td>{animal.breed}</td>
                <td>{animal.foundLocation}</td>
                <td>{animal.foundDate}</td>
                <td>
                  <Button variant="outline-warning border-2 me-1" onClick={() => handleShowAnimalModal(animal)}>
                    <PencilSquare className="fs-4" />
                  </Button>
                  <Button
                    variant="outline-dark border-2"
                    onClick={() => {
                      setAnimalToDelete(animal);
                      setShowDeleteConfirmModal(true);
                    }}
                  >
                    <Trash3 className="fs-4" />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal per aggiungere/modificare un animale */}
      <Modal show={showAnimalModal} onHide={() => setShowAnimalModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{animalToEdit ? "Modifica Animale" : "Aggiungi Animale"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAnimalSubmit}>
            <Form.Group controlId="formSpecies">
              <Form.Label>Specie</Form.Label>
              <Form.Control type="text" value={species} onChange={(e) => setSpecies(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formBreed">
              <Form.Label>Razza</Form.Label>
              <Form.Control type="text" value={breed} onChange={(e) => setBreed(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formFoundDate">
              <Form.Label>Data di Ritrovamento</Form.Label>
              <Form.Control type="date" value={foundDate} onChange={(e) => setFoundDate(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="AVAILABLE">Disponibile</option>
                <option value="ADOPTED">Adottato</option>
                <option value="PENDING">In attesa</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAvailableSince">
              <Form.Label>Disponibile da</Form.Label>
              <Form.Control type="date" value={availableSince} onChange={(e) => setAvailableSince(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPhoto">
              <Form.Label>Foto</Form.Label>
              <Form.Control type="url" value={photo} onChange={(e) => setPhoto(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formFoundLocation">
              <Form.Label>Posizione di Ritrovamento</Form.Label>
              <Form.Control type="text" value={foundLocation} onChange={(e) => setFoundLocation(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formObservation">
              <Form.Label>Osservazioni</Form.Label>
              <Form.Control as="textarea" value={observation} onChange={(e) => setObservation(e.target.value)} rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {animalToEdit ? "Modifica Animale" : "Aggiungi Animale"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal di conferma eliminazione */}
      <Modal show={showDeleteConfirmModal} onHide={() => setShowDeleteConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questo animale?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDeleteAnimal}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AnimalManagement;
