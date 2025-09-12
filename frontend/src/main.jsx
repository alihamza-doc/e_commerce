import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext.jsx';
import "@fontsource/inter";           // Defaults to weight 400
import "@fontsource/inter/500.css";   // Medium
import "@fontsource/inter/600.css";   // Semi-bold
import "@fontsource/inter/700.css";   // Bold
ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
</React.StrictMode>
);
