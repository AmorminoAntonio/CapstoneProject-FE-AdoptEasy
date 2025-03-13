import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNav from "./components/MyNav";
import Homepage from "./features/Homepage";
import Postspage from "./features/Postspage";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Postspage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
