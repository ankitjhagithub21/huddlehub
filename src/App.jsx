

import "./App.css"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Meeting from "./pages/Meeting";

const App = () => {

  return (
    <BrowserRouter>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting" element={<Meeting />} />
      </Routes>
      <Footer />



    </BrowserRouter>
  );
};

export default App;
