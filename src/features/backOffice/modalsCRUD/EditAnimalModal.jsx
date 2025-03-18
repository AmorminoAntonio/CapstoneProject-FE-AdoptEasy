import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";

const EditAnimalModal = ({ show, onHide, animal, showMessage, fetchAnimals, token, setLoading }) => {
  const [editAnimal, setEditAnimal] = useState(animal || {});

  useEffect(() => {
    if (animal) {
      setEditAnimal(animal); // Precompone i dati dell'animale
    }
  }, [animal]);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Previene il comportamento di invio del modulo
    setLoading(true); // Attiva il caricamento

    try {
      const response = await fetch(`http://localhost:8080/admin/animal/update/${editAnimal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(editAnimal),
      });

      const data = await response.json();
      if (response.ok) {
        showMessage("Animal updated successfully!"); // Mostra un messaggio di successo
        fetchAnimals(); // Recupera la lista aggiornata di animali
        onHide(); // Chiudi la finestra di dialogo
      } else {
        showMessage(`Error updating animal: ${data.message}`, "danger");
      }
    } catch (e) {
      showMessage("Error updating animal.", e, "danger");
    } finally {
      setLoading(false); // Disattiva il caricamento
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editAnimal ? (
          <Form onSubmit={handleUpdate}>
            {/* Usa onSubmit per inviare il modulo */}
            <Form.Group controlId="formEditSpecies">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={editAnimal.species} onChange={(e) => setEditAnimal({ ...editAnimal, species: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formEditBreed" className="mt-3">
              <Form.Label>Breed</Form.Label>
              <Form.Control type="text" value={editAnimal.breed} onChange={(e) => setEditAnimal({ ...editAnimal, breed: e.target.value })} />
            </Form.Group>
            {/* Aggiungi altri campi come per species e breed */}
            <div className="d-flex justify-content-between">
              <Button variant="success mt-4" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="primary mt-4" type="submit" disabled={setLoading}>
                {setLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Form>
        ) : (
          <Spinner variant="primary" animation="border" />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditAnimalModal;
