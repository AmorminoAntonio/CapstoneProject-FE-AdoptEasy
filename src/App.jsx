import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNav from "./components/navbar/MyNav";
import Homepage from "./features/homepage/Homepage";
import Footer from "./components/footer/Footer";
import ChiSiamo from "./features/Chisiamo/ChiSiamo";
import AnimalsPage from "./features/albumAdozioni/AnimalsPage";
import ContactUs from "./features/contactUs/ContactUs";
import BackOffice from "./features/backOffice/BackOffice";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ChiSiamo" element={<ChiSiamo />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/backoffice" element={<BackOffice />} />
        <Route path="/contattaci" element={<ContactUs />} />
        <Route path="/album-4zampe" element={<AnimalsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
