import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="app-header">
      <div className="header-left">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h1 className="site-title">
          <Link to="/" className="title-link">Pilot Seal</Link>
        </h1>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      <div className="header-right" ref={navRef}>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/decoder" onClick={() => setMenuOpen(false)}>Decoder</Link>
          <Link to="/endorsement-generator" onClick={() => setMenuOpen(false)}>Endorsement</Link>
          <Link to="/wb" onClick={() => setMenuOpen(false)}>W&B</Link>
          <Link to="/flight-brief" onClick={() => setMenuOpen(false)}>Brief</Link>
          <Link to="/nighttime" onClick={() => setMenuOpen(false)}>Night</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;