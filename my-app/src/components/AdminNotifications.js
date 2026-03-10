import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSiteNotification } from '../context/SiteNotificationContext';
import styles from '../css/AdminNotifications.module.css';

const EMPTY_FORM = {
  title: '',
  message: '',
  level: 'info',
  active: true,
};

function AdminNotifications() {
  const { notification, saveNotification, clearNotification } = useSiteNotification();
  const [form, setForm] = useState(() => notification || EMPTY_FORM);
  const [status, setStatus] = useState('Create or update a site-wide notice.');

  const previewNotification = useMemo(
    () => ({
      title: form.title.trim() || 'Site notice',
      message: form.message.trim() || 'No message entered yet.',
      level: form.level,
      active: form.active,
    }),
    [form]
  );

  const handleChange = (field) => (event) => {
    const value = field === 'active' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    if (!form.message.trim()) {
      setStatus('Message is required before publishing.');
      return;
    }

    saveNotification(form);
    setStatus('Notification saved. It is now visible anywhere this browser loads the site.');
  };

  const handleClear = () => {
    clearNotification();
    setForm(EMPTY_FORM);
    setStatus('Notification cleared.');
  };

  return (
    <>
      <Helmet>
        <title>Admin Notifications | PilotSeal Tools</title>
      </Helmet>

      <div className={styles.page}>
        <section className={styles.header}>
          <div>
            <h1>Admin Notifications</h1>
            <p>Use this page to set maintenance, version update, or service status notices.</p>
          </div>
          <p className={styles.hint}>Current implementation stores notices in browser local storage. For true global broadcast, connect this UI to a shared backend.</p>
        </section>

        <div className={styles.layout}>
          <section className={styles.card}>
            <h2>Editor</h2>
            <label className={styles.field}>
              <span>Title</span>
              <input
                type="text"
                value={form.title}
                onChange={handleChange('title')}
                placeholder="Service update"
              />
            </label>

            <label className={styles.field}>
              <span>Message</span>
              <textarea
                value={form.message}
                onChange={handleChange('message')}
                placeholder="Scheduled maintenance on March 12 from 9 PM to 10 PM Pacific."
                rows={6}
              />
            </label>

            <div className={styles.row}>
              <label className={styles.field}>
                <span>Level</span>
                <select value={form.level} onChange={handleChange('level')}>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                </select>
              </label>

              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={handleChange('active')}
                />
                <span>Show notification</span>
              </label>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.primaryButton} onClick={handleSave}>
                Save notification
              </button>
              <button type="button" className={styles.secondaryButton} onClick={handleClear}>
                Clear notification
              </button>
            </div>

            <p className={styles.status}>{status}</p>
          </section>

          <aside className={styles.card}>
            <h2>Preview</h2>
            <div className={`${styles.preview} ${styles[previewNotification.level]}`}>
              <strong>{previewNotification.title}</strong>
              <p>{previewNotification.message}</p>
              <span>{previewNotification.active ? 'Visible' : 'Hidden'}</span>
            </div>

            {notification ? (
              <div className={styles.savedMeta}>
                <h3>Saved notice</h3>
                <p>{notification.title || 'Site notice'}</p>
                <p>{notification.message}</p>
              </div>
            ) : (
              <p className={styles.empty}>No saved notification yet.</p>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

export default AdminNotifications;
