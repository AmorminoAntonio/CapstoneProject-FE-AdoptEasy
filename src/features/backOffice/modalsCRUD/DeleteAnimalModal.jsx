import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteAnimalModal = ({ show, onHide, animal, showMessage, fetchAnimals, token, setLoading }) => {
  const handleDelete = async () => {
    setLoading(true); // Imposta loading su true
    try {
      const response = await fetch(`http://localhost:8080/admin/animal/delete/${animal.id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      const data = await response.json();
      if (response.ok) {
        showMessage("Animal deleted successfully!");
        fetchAnimals(); // Recupera la lista aggiornata di animali
        onHide(); // Chiudi la finestra di dialogo
      } else {
        showMessage(`Error deleting animal: ${data.message}`, "danger");
      }
    } catch (e) {
      showMessage("Error deleting animal.", e, "danger");
    } finally {
      setLoading(false); // Imposta loading su false
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this animal?</p>
        <Button variant="danger" onClick={handleDelete} disabled={setLoading}>
          {setLoading ? "Deleting..." : "Delete Animal"}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAnimalModal;
