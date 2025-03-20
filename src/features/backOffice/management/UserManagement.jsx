import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUserAsync, createUser, deleteUserAsync } from "../../../redux/slices/userSlice";

const UserManagement = ({ users, handleToastShow }) => {
  const dispatch = useDispatch();

  const [showUserModal, setShowUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("VOLUNTEER"); // Default role is VOLUNTEER

  // Caricamento dell'utente da modificare (se presente)
  useEffect(() => {
    if (userToEdit) {
      setUsername(userToEdit.username);
      setEmail(userToEdit.email);
      setFirstName(userToEdit.firstName);
      setLastName(userToEdit.lastName);
      setPhone(userToEdit.phone);
      setAddress(userToEdit.address);
      setPassword(""); // Optionally reset password (do not prefill for edit)
      setRole(userToEdit.role || "VOLUNTEER"); // Default to VOLUNTEER if not present
    } else {
      resetUserForm(); // Reset form when userToEdit is null
    }
  }, [userToEdit]);

  // Gestisce il submit del form per aggiungere o modificare un utente
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, firstName, lastName, phone, address, password, role };

    try {
      if (userToEdit) {
        // Se stiamo modificando un utente esistente, aggiorna
        dispatch(updateUserAsync({ id: userToEdit.id, ...userData }));
        handleToastShow("Utente aggiornato con successo!");
      } else {
        // Se stiamo creando un nuovo utente
        dispatch(createUser(userData));
        handleToastShow("Nuovo utente aggiunto con successo!");
      }
    } catch (error) {
      handleToastShow("Errore nell'aggiungere o aggiornare l'utente!", error, "danger");
    }
    setShowUserModal(false);
    resetUserForm();
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
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUserAsync(id));
    handleToastShow("Utente eliminato con successo!", "success");
  };

  return (
    <>
      <Button onClick={() => setShowUserModal(true)}>Aggiungi Utente</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome Utente</th>
            <th>Email</th>
            <th>Ruolo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="info" onClick={() => setUserToEdit(user)}>
                  Modifica
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal per aggiungere/modificare un utente */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{userToEdit ? "Modifica Utente" : "Aggiungi Utente"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUserSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Nome Utente</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Indirizzo</Form.Label>
              <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!userToEdit} // Password is required only for creating a new user
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Ruolo</Form.Label>
              <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="VOLUNTEER">Volontario</option>
                <option value="ADMIN">Amministratore</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {userToEdit ? "Modifica Utente" : "Aggiungi Utente"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserManagement;
