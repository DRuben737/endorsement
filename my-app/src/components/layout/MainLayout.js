import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="App">
      <div className="background"></div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;