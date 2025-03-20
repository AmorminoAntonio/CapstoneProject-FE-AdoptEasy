import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAdoption, updateAdoptionStatusAsync, deleteAdoptionAsync, fetchAdoptions } from "../../../redux/slices/adoptionSlice";
import { fetchAnimals } from "../../../redux/slices/animalSlice"; // Assuming you have a fetchAnimals action
import { fetchUsers } from "../../../redux/slices/userSlice"; // Assuming you have a fetchUsers action

const AdoptionManagement = ({ handleToastShow }) => {
  const dispatch = useDispatch();

  // Stato per le adozioni
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [adoptionToEdit, setAdoptionToEdit] = useState(null);
  const [animalId, setAnimalId] = useState("");
  const [userId, setUserId] = useState("");
  const [adoptionNotes, setAdoptionNotes] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [documentsVerified, setDocumentsVerified] = useState(false);

  // Stato per il filtro di ricerca
  const [searchTerm, setSearchTerm] = useState("");

  // Prendere le adozioni dallo store
  const { adoptions, loading } = useSelector((state) => state.adoptions);

  // Prendere gli animali e gli utenti dallo store
  const { animals } = useSelector((state) => state.animals); // Assuming you have a slice for animals
  const { users } = useSelector((state) => state.users); // Assuming you have a slice for users

  // Caricamento delle adozioni al primo render
  useEffect(() => {
    dispatch(fetchAdoptions());
    dispatch(fetchAnimals()); // Fetch animals
    dispatch(fetchUsers()); // Fetch users
  }, [dispatch]);

  useEffect(() => {
    console.log(adoptions); // Aggiungi questo per vedere la struttura dell'oggetto `adoptions`
  }, [adoptions]);

  // Funzione per aprire il modal per creare/modificare un'adozione
  const handleShowAdoptionModal = (adoption = null) => {
    if (adoption) {
      setAdoptionToEdit(adoption);
      setAnimalId(adoption.animalId);
      setUserId(adoption.userId);
      setAdoptionNotes(adoption.adoptionNotes);
      setStatus(adoption.status);
      setDocumentsVerified(adoption.documentsVerified);
    } else {
      setAdoptionToEdit(null);
      setAnimalId("");
      setUserId("");
      setAdoptionNotes("");
      setStatus("PENDING");
      setDocumentsVerified(false);
    }
    setShowAdoptionModal(true);
  };

  // Funzione per gestire l'invio del modulo
  const handleAdoptionSubmit = async (e) => {
    e.preventDefault();
    const adoptionData = {
      animalId,
      userId,
      adoptionNotes,
      status,
      documentsVerified,
    };

    try {
      if (adoptionToEdit) {
        // Modifica adozione
        dispatch(updateAdoptionStatusAsync({ id: adoptionToEdit.id, ...adoptionData }));
        handleToastShow("Adozione aggiornata con successo!", "success");
      } else {
        // Crea nuova adozione
        dispatch(createAdoption(adoptionData));
        handleToastShow("Adozione aggiunta con successo!", "success");
      }
      setShowAdoptionModal(false);
    } catch (error) {
      handleToastShow("Errore nell'aggiungere o aggiornare l'adozione!", error.message, "danger");
    }
  };

  // Funzione per eliminare un'adozione
  const handleDeleteAdoption = (id) => {
    dispatch(deleteAdoptionAsync(id));
    handleToastShow("Adozione eliminata con successo!", "success");
  };

  // Funzione per filtrare le adozioni
  const filteredAdoptions = adoptions.filter((adoption) => {
    return adoption.animal || adoption.username || adoption.adoptionNotes.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Button onClick={() => handleShowAdoptionModal()} variant="primary" className="mb-3">
        Aggiungi Adozione
      </Button>

      {/* Campo di ricerca */}
      <Form.Group controlId="searchAdoption" className="mb-3">
        <Form.Label>Cerca per specie, utente o note</Form.Label>
        <Form.Control type="text" placeholder="Cerca adozioni..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </Form.Group>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Caricamento in corso...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Animale</th>
              <th>Utente</th>
              <th>Status</th>
              <th>Note</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdoptions.length > 0 ? (
              filteredAdoptions.map((adoption) => (
                <tr key={adoption.id}>
                  <td>
                    {adoption.animal
                      ? `${adoption.animal.species || "Specie non disponibile"} - ${adoption.animal.breed || "Razza non disponibile"}`
                      : "Animale non disponibile"}
                  </td>
                  <td>{adoption.user ? adoption.user.username : "N/A"}</td>
                  <td>{adoption.status}</td>
                  <td>{adoption.adoptionNotes}</td>
                  <td>
                    <Button variant="info" onClick={() => handleShowAdoptionModal(adoption)}>
                      Modifica
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDeleteAdoption(adoption.id)}>
                      Elimina
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Nessuna adozione trovata.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal per creare o modificare un'adozione */}
      <Modal show={showAdoptionModal} onHide={() => setShowAdoptionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{adoptionToEdit ? "Modifica Adozione" : "Aggiungi Adozione"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdoptionSubmit}>
            <Form.Group controlId="formAnimalId">
              <Form.Label>Animale</Form.Label>
              <Form.Control as="select" value={animalId} onChange={(e) => setAnimalId(e.target.value)} required>
                <option value="">Seleziona un animale</option>
                {animals.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.species} - {animal.breed}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formUserId">
              <Form.Label>Utente</Form.Label>
              <Form.Control as="select" value={userId} onChange={(e) => setUserId(e.target.value)} required>
                <option value="">Seleziona un utente</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAdoptionNotes">
              <Form.Label>Note Adozione</Form.Label>
              <Form.Control as="textarea" value={adoptionNotes} onChange={(e) => setAdoptionNotes(e.target.value)} rows={3} />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="PENDING">In attesa</option>
                <option value="APPROVED">Approvato</option>
                <option value="COMPLETED">Completato</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDocumentsVerified">
              <Form.Check type="checkbox" label="Documenti Verificati" checked={documentsVerified} onChange={(e) => setDocumentsVerified(e.target.checked)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              {adoptionToEdit ? "Modifica Adozione" : "Aggiungi Adozione"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdoptionManagement;
