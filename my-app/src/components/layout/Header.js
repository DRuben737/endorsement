import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1 className="site-title">
          <Link to="/" className="title-link">Pilot Seal</Link>
        </h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/logbook">Logbook</Link>
        <Link to="/endorsement-generator">Generate Endorsement</Link>
        <Link to="/flight-brief">Flight Brief</Link>
      </nav>
    </header>
  );
}

export default Header;