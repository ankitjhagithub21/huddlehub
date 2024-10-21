
import "./App.css"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import JoinMeeting from "./pages/JoinMeeting";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchUser from "./hooks/useFetchUser";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Meeting from "./pages/Meeting";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  useFetchUser()
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar={true}/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/join-meeting" element={<JoinMeeting />} />
        <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
        <Route path="/meetings/:roomName" element={<Meeting />} />
        <Route path="/*" element={<PageNotFound />} />

      </Routes>
      <Footer />



    </BrowserRouter>
  );
};

export default App;
