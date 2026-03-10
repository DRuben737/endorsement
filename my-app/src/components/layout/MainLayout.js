import React from 'react';
import './MainLayout.css';

import Header from './Header';
import Footer from './Footer';
import SiteNotificationBar from './SiteNotificationBar';

const MainLayout = ({ children }) => {
  return (
    <div className="mainLayoutShell">
      <div className="appBackground"></div>
      <Header />
      <SiteNotificationBar />
      <main className="contentWrapper">
        <div className="contentSurface">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
