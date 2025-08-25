import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import EndorsementGenerator from './components/EndorsementGenerator';
import FlightBrief from './components/FlightBrief';
import HomePage from './components/HomePage';
import Logbook from './components/Logbook';

import Modal from 'react-modal';
// For accessibility reasons, bind modal to appElement
Modal.setAppElement('#root');

function App() {
  return (
    <Router>
      <div className="App">
        {/* 背景图 */}
        <div className="background"></div>

        <header>
          <h1>Pilot Seal</h1>
          <img src="/images/logo.png" alt="Logo" className="logo" />
          <nav>
            <Link to="/">Home</Link> | 
            <Link to="/logbook">Logbook</Link> | 
            <Link to="/endorsement-generator">Generate Endorsement</Link> | 
            <Link to="/flight-brief">Flight Brief</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/logbook" element={<Logbook />} />
            <Route path="/endorsement-generator" element={<EndorsementGenerator />} />
            <Route path="/flight-brief" element={<FlightBrief />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;