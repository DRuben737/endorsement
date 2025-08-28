import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1 className="site-title">
          <Link to="/" className="title-link">Pilot Seal</Link>
        </h1>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      <div className="header-right">
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/logbook">Logbook</Link>
          <Link to="/endorsement-generator">Generate Endorsement</Link>
          <Link to="/flight-brief">Flight Brief</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;