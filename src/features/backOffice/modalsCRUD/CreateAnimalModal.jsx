import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const CreateAnimalModal = ({ show, onHide, showMessage, fetchAnimals, token, setLoading }) => {
  const [newAnimal, setNewAnimal] = useState({
    species: "",
    breed: "",
    description: "",
    foundLocation: "",
    observation: "",
    foundDate: "",
    availableSince: "",
    photo: "",
  });

  const handleCreateAnimal = async (e) => {
    e.preventDefault(); // Previene l'invio del modulo
    setLoading(true); // Imposta lo stato di loading su true
    try {
      const response = await fetch("http://localhost:8080/admin/animal/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(newAnimal),
      });

      const data = await response.json();
      if (response.ok) {
        showMessage("Animal created successfully!");
        fetchAnimals(); // Recupera la lista aggiornata di animali
        onHide(); // Chiudi la finestra di dialogo
      } else {
        showMessage(`Error creating animal: ${data.message}`, "danger");
      }
    } catch (e) {
      showMessage("Error creating animal.", e, "danger");
    } finally {
      setLoading(false); // Imposta lo stato di loading su false
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateAnimal}>
          {" "}
          {/* Usa onSubmit per inviare il modulo */}
          {/* Species Field */}
          <Form.Group controlId="formSpecies">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={newAnimal.species} onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })} />
          </Form.Group>
          {/* Breed Field */}
          <Form.Group controlId="formBreed">
            <Form.Label>Breed</Form.Label>
            <Form.Control type="text" value={newAnimal.breed} onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })} />
          </Form.Group>
          {/* Description Field */}
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={newAnimal.description} onChange={(e) => setNewAnimal({ ...newAnimal, description: e.target.value })} />
          </Form.Group>
          {/* Found Location Field */}
          <Form.Group controlId="formFoundLocation">
            <Form.Label>Found Location</Form.Label>
            <Form.Control type="text" value={newAnimal.foundLocation} onChange={(e) => setNewAnimal({ ...newAnimal, foundLocation: e.target.value })} />
          </Form.Group>
          {/* Observation Field */}
          <Form.Group controlId="formObservation">
            <Form.Label>Observation</Form.Label>
            <Form.Control as="textarea" rows={3} value={newAnimal.observation} onChange={(e) => setNewAnimal({ ...newAnimal, observation: e.target.value })} />
          </Form.Group>
          {/* Found Date Field */}
          <Form.Group controlId="formFoundDate">
            <Form.Label>Found Date</Form.Label>
            <Form.Control type="date" value={newAnimal.foundDate} onChange={(e) => setNewAnimal({ ...newAnimal, foundDate: e.target.value })} />
          </Form.Group>
          {/* Available Since Field */}
          <Form.Group controlId="formAvailableSince">
            <Form.Label>Available Since</Form.Label>
            <Form.Control type="date" value={newAnimal.availableSince} onChange={(e) => setNewAnimal({ ...newAnimal, availableSince: e.target.value })} />
          </Form.Group>
          {/* Photo Field */}
          <Form.Group controlId="formPhoto">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="text"
              value={newAnimal.photo}
              onChange={(e) => setNewAnimal({ ...newAnimal, photo: e.target.value })}
              placeholder="Enter URL of the photo"
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={setLoading}>
              {setLoading ? "Creating..." : "Create Animal"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAnimalModal;
