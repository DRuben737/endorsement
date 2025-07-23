import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Logbook from './components/Logbook';
import WeightAndBalance from './components/WeightAndBalance';
import EndorsementGenerator from './components/EndorsementGenerator';
import HomePage from './components/HomePage';  // 导入HomePage组件
//import MetarWeather from './components/MetarWeather'; // 引入新组件

// For accessibility reasons, bind modal to appElement
import Modal from 'react-modal';
Modal.setAppElement('#root');

function App() {
  return (
    <Router>
      <div className="App">
        <div className="background"></div> {/* 背景图 */}
        <h1>Pilot Seal</h1>
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/logbook">Logbook</Link> | 
          <Link to="/weight-and-balance">Weight and Balance</Link> | 
          <Link to="/endorsement-generator">Generate Endorsement</Link> |  {/* 新增链接 */}
          {/*<Link to="/metar-weather">METAR Weather</Link>*/}
          <a href="https://chat.pilotseal.com" target="_blank" rel="noopener noreferrer">Pilot Chat</a>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* 主页路由 */}
          <Route path="/logbook" element={<Logbook />} />
          <Route path="/weight-and-balance" element={<WeightAndBalance />} />
          <Route path="/endorsement-generator" element={<EndorsementGenerator />} />  {/* 新的EndorsementGenerator页面 */}
          {/*<Route path="/metar-weather" element={<MetarWeather />} /> {/* 新的路由 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;