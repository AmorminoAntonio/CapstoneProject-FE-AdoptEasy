import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table, Modal, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";

// Funzione per ottenere il token dal localStorage

const BackOffice = () => {
  const [animals, setAnimals] = useState([]); // Stato per memorizzare la lista degli animali
  const [showCreateModal, setShowCreateModal] = useState(false); // Stato per il modal di creazione animale
  const [showEditModal, setShowEditModal] = useState(false); // Stato per il modal di modifica animale
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Stato per il modal di conferma eliminazione
  const [newAnimal, setNewAnimal] = useState({
    species: "",
    breed: "",
    foundDate: "",
    description: "",
    status: "AVAILABLE",
    availableSince: "",
    photo: "",
    foundLocation: "",
    observation: "",
  });
  const [editAnimal, setEditAnimal] = useState(null); // Stato per l'animale da modificare
  const [animalToDelete, setAnimalToDelete] = useState(null); // Animale da eliminare

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token"); // Recupera direttamente il token come stringa
  };

  const token = getTokenFromLocalStorage();
  if (!token) {
    console.error("Token non trovato!");
  } else {
    console.log("token trovato: ", token);
  }

  // Recupera gli animali dal server
  const fetchAnimals = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/animal/all", {
        headers: {
          Authorization: `Bearer ${token}`, // Aggiungi il Bearer token all'header della richiesta
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAnimals(data); // Popola la lista degli animali
      } else {
        console.error("Errore nel recupero degli animali:", data.message);
      }
    } catch (error) {
      console.error("Errore nella richiesta degli animali:", error);
    }
  };

  // Crea un nuovo animale
  const handleCreateAnimal = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/animal/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Aggiungi il Bearer token all'header della richiesta
        },
        body: JSON.stringify(newAnimal),
      });
      const data = await response.json();
      if (response.ok) {
        setAnimals([...animals, data]); // Aggiunge l'animale creato alla lista
        setNewAnimal({
          species: "",
          breed: "",
          foundDate: "",
          description: "",
          status: "AVAILABLE",
          availableSince: "",
          photo: "",
          foundLocation: "",
          observation: "",
        });
        setShowCreateModal(false);
      } else {
        console.error("Errore nella creazione dell'animale:", data.message);
      }
    } catch (error) {
      console.error("Errore nella creazione dell'animale:", error);
    }
  };

  // Modifica un animale esistente
  const handleUpdate = async () => {
    if (!editAnimal) return; // Se non c'è un animale da modificare, esci dalla funzione
    try {
      const response = await fetch(`http://localhost:8080/admin/animal/${editAnimal.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Aggiungi il Bearer token all'header della richiesta
        },
        body: JSON.stringify(editAnimal),
      });
      const data = await response.json();
      if (response.ok) {
        setAnimals(animals.map((animal) => (animal.id === editAnimal.id ? data : animal)));
        setEditAnimal(null);
        setShowEditModal(false); // Chiudi il modal dopo l'aggiornamento
      } else {
        console.error("Errore nella modifica dell'animale:", data.message);
      }
    } catch (error) {
      console.error("Errore nella modifica dell'animale:", error);
    }
  };

  // Elimina un animale
  const handleDelete = async () => {
    if (!animalToDelete) return; // Se non c'è un animale da eliminare, esci dalla funzione
    try {
      const response = await fetch(`http://localhost:8080/admin/animal/${animalToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Aggiungi il Bearer token all'header della richiesta
        },
      });
      if (response.ok) {
        setAnimals(animals.filter((animal) => animal.id !== animalToDelete.id)); // Rimuove l'animale dalla lista
        setAnimalToDelete(null);
        setShowDeleteModal(false); // Chiudi il modal di conferma
      } else {
        const data = await response.json();
        console.error("Errore nell'eliminazione dell'animale:", data.message);
      }
    } catch (error) {
      console.error("Errore nell'eliminazione dell'animale:", error);
    }
  };

  useEffect(() => {
    fetchAnimals(); // Carica gli animali dal server quando il componente viene montato
  }, []);

  return (
    <Container>
      <h2 className="my-4">Back Office - Gestione Animali</h2>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Crea Nuovo Animale
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Specie</th>
                <th>Razza</th>
                <th>Descrizione</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.description}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setEditAnimal(animal);
                        setShowEditModal(true);
                      }}
                    >
                      Modifica
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => {
                        setAnimalToDelete(animal);
                        setShowDeleteModal(true);
                      }}
                    >
                      Elimina
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal per la creazione di un nuovo animale */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crea Nuovo Animale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSpecies">
              <Form.Label>Specie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci specie"
                value={newAnimal.species}
                onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBreed" className="mt-3">
              <Form.Label>Razza</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci razza"
                value={newAnimal.breed}
                onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formFoundDate" className="mt-3">
              <Form.Label>Data di Ritrovamento</Form.Label>
              <Form.Control type="date" value={newAnimal.foundDate} onChange={(e) => setNewAnimal({ ...newAnimal, foundDate: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descrizione dell'animale"
                value={newAnimal.description}
                onChange={(e) => setNewAnimal({ ...newAnimal, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formStatus" className="mt-3">
              <Form.Label>Stato</Form.Label>
              <Form.Control as="select" value={newAnimal.status} onChange={(e) => setNewAnimal({ ...newAnimal, status: e.target.value })}>
                <option value="AVAILABLE">Disponibile</option>
                <option value="ADOPTED">Adottato</option>
                <option value="IN_REHABILITATION">In Riabilitazione</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAvailableSince" className="mt-3">
              <Form.Label>Disponibile da</Form.Label>
              <Form.Control type="date" value={newAnimal.availableSince} onChange={(e) => setNewAnimal({ ...newAnimal, availableSince: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formPhoto" className="mt-3">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci URL della foto"
                value={newAnimal.photo}
                onChange={(e) => setNewAnimal({ ...newAnimal, photo: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formFoundLocation" className="mt-3">
              <Form.Label>Luogo di Ritrovamento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il luogo di ritrovamento"
                value={newAnimal.foundLocation}
                onChange={(e) => setNewAnimal({ ...newAnimal, foundLocation: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formObservation" className="mt-3">
              <Form.Label>Osservazioni</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci osservazioni"
                value={newAnimal.observation}
                onChange={(e) => setNewAnimal({ ...newAnimal, observation: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleCreateAnimal}>
            Crea Animale
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal per la modifica di un animale */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Animale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Simile a quello di creazione, ma con i dati dell'animale da modificare */}
          <Form>
            <Form.Group controlId="formSpecies">
              <Form.Label>Specie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci specie"
                value={editAnimal?.species || ""}
                onChange={(e) => setEditAnimal({ ...editAnimal, species: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBreed" className="mt-3">
              <Form.Label>Razza</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci razza"
                value={editAnimal?.breed || ""}
                onChange={(e) => setEditAnimal({ ...editAnimal, breed: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descrizione dell'animale"
                value={editAnimal?.description || ""}
                onChange={(e) => setEditAnimal({ ...editAnimal, description: e.target.value })}
              />
            </Form.Group>
            {/* Altri campi come nella creazione, ma con i dati dell'animale da modificare */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Modifica Animale
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal per confermare eliminazione */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questo animale?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BackOffice;
