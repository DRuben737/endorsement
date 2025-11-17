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
import Decoder from './components/Decoder';
import NightTimeCalculator from './components/NightTimeCalculator';
import WeightBalanceCalculator from "./components/WeightBalanceCalculator";


// For accessibility reasons, bind modal to appElement
Modal.setAppElement('#root');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/logbook" element={<MainLayout><Logbook /></MainLayout>} />
        <Route path="/endorsement-generator" element={<MainLayout><EndorsementGenerator /></MainLayout>} />
        <Route path="/flight-brief" element={<MainLayout><FlightBrief /></MainLayout>} />
        <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
        <Route path="/decoder" element={<MainLayout><Decoder /></MainLayout>} />
        <Route path="/nighttime" element={<MainLayout><NightTimeCalculator /></MainLayout>} />
        <Route path="/wb"element={<MainLayout><WeightBalanceCalculator />
    </MainLayout>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;