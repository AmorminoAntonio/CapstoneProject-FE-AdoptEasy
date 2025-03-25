import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Image, Container, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash3 } from "react-bootstrap-icons";
import "./ManagementsCss.css";

const UserManagement = ({ handleToastShow }) => {
  const [users, setUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchRole, setSearchRole] = useState("");

  const [showUserModal, setShowUserModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("VOLUNTEER");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Funzione per recuperare gli utenti
  const fetchUsers = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
      };

      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const response = await fetch(`http://localhost:8080/utente/admin/all`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Errore durante il caricamento degli utenti");
      }

      const data = await response.json();
      setUsers(data.content);
    } catch (error) {
      console.error("Errore nel caricamento degli utenti:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Carica gli utenti all'inizio

  const filteredUsers = users.filter((user) => {
    const matchesUsername = user.username.toLowerCase().includes(searchUsername.toLowerCase());
    const matchesEmail = user.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchesRole = user.role.toLowerCase().includes(searchRole.toLowerCase());

    return matchesUsername && matchesEmail && matchesRole;
  });

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, firstName, lastName, phone, address, password, role };

    try {
      const authToken = getAuthToken();
      const headers = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      if (isEditMode && userToEdit) {
        // Controllo se userToEdit non è null prima di eseguire l'aggiornamento
        const response = await fetch(`http://localhost:8080/utente/admin/update/${userToEdit.id}`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error("Errore durante l'aggiornamento dell'utente");
        }

        // Recupera di nuovo la lista degli utenti aggiornata
        fetchUsers();
        handleToastShow("Utente aggiornato con successo!");
      } else {
        // Creazione di un nuovo utente
        const response = await fetch(`http://localhost:8080/utente/registration`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error("Errore durante la creazione dell'utente");
        }

        // Recupera di nuovo la lista degli utenti aggiornata
        fetchUsers();
        handleToastShow("Nuovo utente aggiunto con successo!");
      }

      setShowUserModal(false);
      resetUserForm();
    } catch (error) {
      handleToastShow("Errore nell'aggiungere o aggiornare l'utente!", error.message, "danger");
    }
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsEditMode(true);
    setUsername(user.username);
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.phone);
    setAddress(user.address);
    setRole(user.role);
    setShowUserModal(true);
  };

  const resetUserForm = () => {
    setUsername("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAddress("");
    setPassword("");
    setRole("VOLUNTEER");
    setUserToEdit(null);
    setIsEditMode(false);
  };

  const handleDeleteUser = async () => {
    try {
      const authToken = getAuthToken();
      const headers = {
        "Content-Type": "application/json",
      };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const response = await fetch(`http://localhost:8080/utente/admin/delete/${userToDelete.id}`, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione dell'utente");
      }

      // Ricarica la lista degli utenti dopo l'eliminazione
      fetchUsers();
      handleToastShow("Utente eliminato con successo!", "success");
      setShowDeleteModal(false);
    } catch (error) {
      handleToastShow("Errore nell'eliminazione dell'utente!", error.message, "danger");
    }
  };

  return (
    <>
      <Form className="mb-3">
        <Row className="d-flex">
          <Col md={3}>
            <Form.Group controlId="searchUsername">
              <Form.Label className="fw-semibold">Ricerca per Nome Utente</Form.Label>
              <Form.Control type="text" value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)} placeholder="Nome Utente" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="searchEmail">
              <Form.Label className="fw-semibold">Ricerca per Email</Form.Label>
              <Form.Control type="email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} placeholder="Email" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="searchRole">
              <Form.Label className="fw-semibold">Ricerca per Ruolo</Form.Label>
              <Form.Control as="select" value={searchRole} onChange={(e) => setSearchRole(e.target.value)}>
                <option value="">Tutti i Ruoli</option>
                <option value="ADOPTER">Adottante</option>
                <option value="VOLUNTEER">Volontario</option>
                <option value="ADMIN">Amministratore</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Button className="mb-3" onClick={() => setShowUserModal(true)}>
        Aggiungi Utente
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome Utente</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Ruolo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Image src={user.avatarUtente} width={40} /> {user.username}
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <Button onClick={() => handleEditClick(user)}>
                  <PencilSquare />
                </Button>
                <Button
                  onClick={() => {
                    setUserToDelete(user);
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash3 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal di conferma per eliminazione */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questo utente?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowDeleteModal(false)}>Annulla</Button>
          <Button onClick={handleDeleteUser}>Conferma Eliminazione</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal per aggiungere/modificare utente */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Modifica Utente" : "Aggiungi Utente"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUserSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label className="fw-semibold">Nome Utente</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label className="fw-semibold">Nome</Form.Label>
              <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label className="fw-semibold">Cognome</Form.Label>
              <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label className="fw-semibold">Telefono</Form.Label>
              <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label className="fw-semibold">Indirizzo</Form.Label>
              <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={!isEditMode} />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label className="fw-semibold">Ruolo</Form.Label>
              <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="VOLUNTEER">Volontario</option>
                <option value="ADMIN">Amministratore</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit">{isEditMode ? "Modifica Utente" : "Aggiungi Utente"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserManagement;
