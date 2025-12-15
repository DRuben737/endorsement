import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* ====== 主域立即跳转（防止任何渲染/闪现）====== */
const host = window.location.hostname;

if (host === 'pilotseal.com' || host === 'www.pilotseal.com') {
  // 防止首屏闪现
  document.documentElement.style.display = 'none';
  window.location.replace('https://tool.pilotseal.com');
}
/* =========================================== */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();