import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import EndorsementGenerator from './components/EndorsementGenerator';
import FlightBrief from './components/FlightBrief';
import HomePage from './components/HomePage';
import Logbook from './components/Logbook';
import About from './components/About';
import Privacy from './components/Privacy';
import Modal from 'react-modal';
import MainLayout from './components/layout/MainLayout';

// For accessibility reasons, bind modal to appElement
Modal.setAppElement('#root');

function App() {
  return (
    <Router>
      <MainLayout>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/logbook" element={<Logbook />} />
            <Route path="/endorsement-generator" element={<EndorsementGenerator />} />
            <Route path="/flight-brief" element={<FlightBrief />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
      </MainLayout>
    </Router>
  );
}

export default App;