import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // BrowserRouter 임포트
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfirmPopupProvider } from './components/confirmPopup';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfirmPopupProvider>
      <Router>
        <App />
      </Router>
    </ConfirmPopupProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
