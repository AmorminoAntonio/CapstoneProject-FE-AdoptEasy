import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimals } from "../../redux/slices/animalSlice";
import { fetchAdoptions } from "../../redux/slices/adoptionSlice";
import { fetchUsers } from "../../redux/slices/userSlice";
import { Container, Accordion, Spinner } from "react-bootstrap";
import AnimalManagement from "./management/AnimalManagement";
import AdoptionManagement from "./management/AdoptionManagement";
import UserManagement from "./management/UserManagement";
import ToastMessage from "./toast_message/ToastMessage"; // Import del toast message

const BackOffice = () => {
  const dispatch = useDispatch();
  const animals = useSelector((state) => state.animals.animals);
  const adoptions = useSelector((state) => state.adoptions.adoptions);
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.animals.loading);

  // Messaggio di Toast
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });

  // Caricamento dei dati al montaggio
  useEffect(() => {
    dispatch(fetchAnimals());
    dispatch(fetchAdoptions());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Gestione del messaggio di toast
  const handleToastShow = (message, type = "success") => {
    setToastMessage({ message, type });
  };

  return (
    <Container>
      <h1 className="text-center mt-2">BACKOFFICE - ANIMALI / ADOZIONI / UTENTI</h1>

      {/* Messaggio Toast */}
      <ToastMessage toastMessage={toastMessage} setToastMessage={setToastMessage} />

      {/* Sezione Animali */}
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Gestisci Animali</Accordion.Header>
          <Accordion.Body>
            <AnimalManagement animals={animals} loading={loading} handleToastShow={handleToastShow} />
          </Accordion.Body>
        </Accordion.Item>

        {/* Sezione Adozioni */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Gestisci Adozioni</Accordion.Header>
          <Accordion.Body>
            <AdoptionManagement adoptions={adoptions} handleToastShow={handleToastShow} />
          </Accordion.Body>
        </Accordion.Item>

        {/* Sezione Utenti */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Gestisci Utenti</Accordion.Header>
          <Accordion.Body>
            <UserManagement users={users} handleToastShow={handleToastShow} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default BackOffice;
