import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'pilotseal.siteNotification';
const SYNC_EVENT = 'pilotseal:site-notification-updated';

const SiteNotificationContext = createContext(null);

function readStoredNotification() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch (error) {
    console.error('Failed to read stored site notification:', error);
    return null;
  }
}

export function SiteNotificationProvider({ children }) {
  const [notification, setNotificationState] = useState(() => readStoredNotification());

  useEffect(() => {
    const syncFromStorage = () => {
      setNotificationState(readStoredNotification());
    };

    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        syncFromStorage();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(SYNC_EVENT, syncFromStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(SYNC_EVENT, syncFromStorage);
    };
  }, []);

  const value = useMemo(
    () => ({
      notification,
      saveNotification(nextNotification) {
        const payload = {
          ...nextNotification,
          updatedAt: new Date().toISOString(),
        };

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        setNotificationState(payload);
        window.dispatchEvent(new Event(SYNC_EVENT));
      },
      clearNotification() {
        window.localStorage.removeItem(STORAGE_KEY);
        setNotificationState(null);
        window.dispatchEvent(new Event(SYNC_EVENT));
      },
    }),
    [notification]
  );

  return (
    <SiteNotificationContext.Provider value={value}>
      {children}
    </SiteNotificationContext.Provider>
  );
}

export function useSiteNotification() {
  const context = useContext(SiteNotificationContext);

  if (!context) {
    throw new Error('useSiteNotification must be used inside SiteNotificationProvider');
  }

  return context;
}
