import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import './App.css';

import { SiteNotificationProvider } from './context/SiteNotificationContext';
import MainLayout from './components/layout/MainLayout';
import routeConfig from './routes';

if (typeof document !== 'undefined') {
  const appRoot = document.getElementById('root');
  if (appRoot) {
    Modal.setAppElement(appRoot);
  }
}

const routeComponents = {
  About: lazy(() => import('./components/About')),
  AdminNotifications: lazy(() => import('./components/AdminNotifications')),
  Decoder: lazy(() => import('./components/Decoder')),
  EndorsementGenerator: lazy(() => import('./components/EndorsementGenerator')),
  FlightBrief: lazy(() => import('./components/FlightBrief')),
  HomePage: lazy(() => import('./components/HomePage')),
  Logbook: lazy(() => import('./components/Logbook')),
  NightTimeCalculator: lazy(() => import('./components/NightTimeCalculator')),
  Privacy: lazy(() => import('./components/Privacy')),
  WeightBalanceCalculator: lazy(() => import('./components/WeightBalanceCalculator')),
};

function App() {
  return (
    <HelmetProvider>
      <SiteNotificationProvider>
        <Router>
          <Routes>
            {routeConfig.map((route) => {
              const PageComponent = routeComponents[route.component];
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <MainLayout>
                      <Suspense fallback={<div style={{ padding: '2rem 0' }}>Loading...</div>}>
                        <PageComponent />
                      </Suspense>
                    </MainLayout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </SiteNotificationProvider>
    </HelmetProvider>
  );
}

export default App;
