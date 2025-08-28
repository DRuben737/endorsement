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
    <div className="app-wrapper">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/logbook" element={<MainLayout><Logbook /></MainLayout>} />
          <Route path="/endorsement-generator" element={<MainLayout><EndorsementGenerator /></MainLayout>} />
          <Route path="/flight-brief" element={<MainLayout><FlightBrief /></MainLayout>} />
          <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
        </Routes>
      </div>
    </div>
  );
}

// Wrap App with Router to provide routing context for useLocation
function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;