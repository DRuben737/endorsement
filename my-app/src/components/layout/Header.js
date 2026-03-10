import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.css';
import routes from '../../routes';

const navItems = routes.filter((route) => route.showInNav);

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="app-header">
      <div className="header-left">
        <img src="/images/logo.png" alt="PilotSeal Tools logo" className="logo" />
        <p className="site-title">
          <Link to="/" className="title-link">PilotSeal Tools</Link>
        </p>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <div className="header-right" ref={navRef}>
        <nav id="primary-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {item.navLabel || item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
