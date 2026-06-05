import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Importe o Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* O AuthProvider deve envolver todo o App */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);