import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateAnimalAsync, createAnimal, deleteAnimalAsync, fetchAnimals } from "../../../redux/slices/animalSlice";

const AnimalManagement = ({ handleToastShow }) => {
  const dispatch = useDispatch();
  const { animals, loading } = useSelector((state) => state.animals); // Assicurati di avere gli animali nello store
  const [showAnimalModal, setShowAnimalModal] = useState(false);
  const [animalToEdit, setAnimalToEdit] = useState(null);
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [foundDate, setFoundDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("AVAILABLE"); // Default to AVAILABLE
  const [availableSince, setAvailableSince] = useState("");
  const [photo, setPhoto] = useState("");
  const [foundLocation, setFoundLocation] = useState("");
  const [observation, setObservation] = useState("");

  // Caricamento degli animali all'avvio del componente
  useEffect(() => {
    dispatch(fetchAnimals()); // Assicurati che fetchAnimals sia un'azione per caricare gli animali
  }, [dispatch]);

  // Funzione per gestire l'invio del modulo
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
      if (animalToEdit) {
        // Se stiamo modificando un animale
        dispatch(updateAnimalAsync({ ...animalToEdit, ...animalData }));
        handleToastShow("Animale aggiornato con successo!");
      } else {
        // Se stiamo creando un nuovo animale
        dispatch(createAnimal(animalData));
        handleToastShow("Nuovo animale aggiunto con successo!");
      }
    } catch (error) {
      handleToastShow("Errore nell'aggiungere o aggiornare l'animale!", error, "danger");
    }
    setShowAnimalModal(false);
    resetAnimalForm();
  };

  // Funzione per resettare il modulo
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

  // Funzione per eliminare un animale
  const handleDeleteAnimal = (id) => {
    dispatch(deleteAnimalAsync(id));
    handleToastShow("Animale eliminato con successo!", "success");
  };

  // Funzione per aprire il modal per aggiungere o modificare un animale
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

  return (
    <>
      <Button onClick={() => handleShowAnimalModal()}>Aggiungi Animale</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Specie</th>
            <th>Razza</th>
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
            animals.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.species}</td>
                <td>{animal.breed}</td>
                <td>{animal.foundDate}</td>
                <td>
                  <Button variant="info" onClick={() => handleShowAnimalModal(animal)}>
                    Modifica
                  </Button>{" "}
                  <Button variant="danger" onClick={() => handleDeleteAnimal(animal.id)}>
                    Elimina
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
    </>
  );
};

export default AnimalManagement;
