import React from 'react';
import { useSiteNotification } from '../../context/SiteNotificationContext';
import './siteNotificationBar.css';

function SiteNotificationBar() {
  const { notification } = useSiteNotification();

  if (!notification?.active || !notification?.message?.trim()) {
    return null;
  }

  const tone = notification.level || 'info';

  return (
    <section className={`siteNotificationBar ${tone}`} aria-label="Site notification">
      <div className="siteNotificationInner">
        <div>
          <strong>{notification.title?.trim() || 'Site notice'}</strong>
          <p>{notification.message.trim()}</p>
        </div>
        {notification.updatedAt ? (
          <span className="siteNotificationMeta">
            Updated {new Date(notification.updatedAt).toLocaleString()}
          </span>
        ) : null}
      </div>
    </section>
  );
}

export default SiteNotificationBar;
