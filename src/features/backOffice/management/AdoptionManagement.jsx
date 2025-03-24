import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Spinner, Row, Col, Image, FormLabel } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

const AdoptionManagement = ({ handleToastShow }) => {
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [adoptionToEdit, setAdoptionToEdit] = useState(null);
  const [animalId, setAnimalId] = useState("");
  const [userId, setUserId] = useState("");
  const [adoptionNotes, setAdoptionNotes] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [documentsVerified, setDocumentsVerified] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [adoptions, setAdoptions] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          handleToastShow("Token non trovato. Effettua il login!", "danger");
          return;
        }

        const [adoptionsResponse, animalsResponse, usersResponse] = await Promise.all([
          fetch("http://localhost:8080/admin/adozioni/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:8080/admin/animal/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:8080/utente/admin/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!adoptionsResponse.ok || !animalsResponse.ok || !usersResponse.ok) {
          throw new Error("Errore nel recuperare i dati");
        }

        const adoptionsData = await adoptionsResponse.json();
        const animalsData = await animalsResponse.json();
        const usersData = await usersResponse.json();

        if (adoptionsData.content.length === 0 && animalsData.content.length === 0 && usersData.content.length === 0) {
          handleToastShow("Non ci sono dati disponibili.", "warning");
          return;
        }

        setAdoptions(adoptionsData.content);
        setAnimals(animalsData.content);
        setUsers(usersData.content);
        console.log(adoptionsData.content);
        console.log(animalsData.content);
        console.log(usersData.content);
      } catch (error) {
        console.error("Errore nel recuperare i dati:", error);
        handleToastShow("Errore nel recuperare i dati!", "danger");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [handleToastShow]);

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

  const handleAdoptionCreateSubmit = async (e) => {
    e.preventDefault();

    if (!animalId || !userId || !adoptionNotes) {
      handleToastShow("Completa tutti i campi obbligatori!", "danger");
      return;
    }

    const adoptionData = {
      adoptionNotes,
      animalId,
      userId,
      status: "PENDING",
      documentsVerified: false,
    };

    const token = localStorage.getItem("authToken");

    if (!token) {
      handleToastShow("Token mancante. Effettua il login!", "danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/admin/adozioni/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adoptionData),
      });

      if (!response.ok) {
        throw new Error("Errore nell'aggiungere l'adozione");
      }

      const newAdoption = await response.json();
      setAdoptions([...adoptions, newAdoption]);

      handleToastShow("Adozione aggiunta con successo!", "success");

      setShowAdoptionModal(false);
    } catch (error) {
      handleToastShow("Errore nell'aggiungere l'adozione!", error, "danger");
    }
  };

  const handleAdoptionEditSubmit = async (e) => {
    e.preventDefault();

    if (!adoptionNotes) {
      handleToastShow("Completa tutti i campi obbligatori!", "danger");
      return;
    }

    const adoptionData = {
      adoptionNotes,
      status,
      documentsVerified,
    };

    const token = localStorage.getItem("authToken");

    if (!token) {
      handleToastShow("Token mancante. Effettua il login!", "danger");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/admin/adozioni/update/${adoptionToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adoptionData),
      });

      if (!response.ok) {
        throw new Error("Errore nell'aggiornare l'adozione");
      }

      const updatedAdoption = await response.json();
      setAdoptions(adoptions.map((adoption) => (adoption.id === adoptionToEdit.id ? updatedAdoption : adoption)));

      handleToastShow("Adozione aggiornata con successo!", "success");

      setShowAdoptionModal(false);
    } catch (error) {
      handleToastShow("Errore nell'aggiornare l'adozione!", error, "danger");
    }
  };

  const filteredAdoptions = adoptions.filter((adoption) => {
    return (
      adoption.animal?.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adoption.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adoption.adoptionNotes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adoption.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Button onClick={() => handleShowAdoptionModal()} variant="primary" className="mb-3">
        Aggiungi Adozione
      </Button>

      <Row>
        <Col md={3}>
          <Form.Group controlId="searchAdoptionAnimal" className="mb-3">
            <Form.Control type="text" placeholder="Cerca per nome ANIMALE..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="searchAdoptionUser" className="mb-3">
            <Form.Control type="text" placeholder="Cerca per ADOTTANTE..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="searchAdoptionNotes" className="mb-3">
            <Form.Control type="text" placeholder="Cerca per NOTE ADOZIONE..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="APPROVED">Approvata</option>
            <option value="REJECTED">Rifiutata</option>
            <option value="PENDING">In Attesa</option>
            <option value="COMPLETED">Completata</option>
          </Form.Control>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Caricamento in corso...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
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
                    <Image width={70} src={adoption.animaleId.photo} /> - {adoption.animaleId.species}
                  </td>
                  <td>
                    <Image width={50} src={adoption.utenteId.avatarUtente} /> - {adoption.utenteId.username}
                  </td>
                  <td>{adoption.status}</td>
                  <td>{adoption.adoptionNotes}</td>
                  <td>
                    <Button variant="outline-dark" onClick={() => handleShowAdoptionModal(adoption)}>
                      <PencilSquare />
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

      {/* Modal per creazione */}
      <Modal show={showAdoptionModal && !adoptionToEdit} onHide={() => setShowAdoptionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Adozione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdoptionCreateSubmit}>
            <Form.Group controlId="formAnimalId">
              <Form.Label>Animale</Form.Label>
              <Form.Control as="select" value={animalId} onChange={(e) => setAnimalId(e.target.value)} required>
                <option value="">Seleziona un animale</option>
                {animals.map((animal) => (
                  <option key={animal.id} value={animal.id} className="fw-bold">
                    ID:{animal.id} - {animal.species} - {animal.breed}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formUserId">
              <Form.Label>Utente</Form.Label>
              <Form.Control as="select" value={userId} onChange={(e) => setUserId(e.target.value)} required>
                <option value="">Seleziona un utente</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id} className="fw-bold">
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formAdoptionNotes">
              <Form.Label>Note Adozione</Form.Label>
              <Form.Control as="textarea" value={adoptionNotes} onChange={(e) => setAdoptionNotes(e.target.value)} rows={3} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Aggiungi Adozione
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal per modifica */}
      <Modal show={showAdoptionModal && adoptionToEdit} onHide={() => setShowAdoptionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Adozione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdoptionEditSubmit}>
            <Form.Group controlId="formAdoptionNotes">
              <Form.Label>Note Adozione</Form.Label>
              <Form.Control as="textarea" value={adoptionNotes} onChange={(e) => setAdoptionNotes(e.target.value)} rows={3} />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="REJECTED">REJECTED</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDocumentsVerified">
              <Form.Check type="checkbox" label="Documenti Verificati" checked={documentsVerified} onChange={(e) => setDocumentsVerified(e.target.checked)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Salva Modifiche
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdoptionManagement;
