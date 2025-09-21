import React from 'react';

import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <div className="background"></div>
      <Header />
      <main className="content-wrapper" style={{ flex: 1, padding: '20px', minHeight: '70vh' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;