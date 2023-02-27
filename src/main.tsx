import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GoogleOAuthProvider, } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="101000229988-q1g8rt36598b7o9e1tn1vpeue12pgemc.apps.googleusercontent.com">

    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,


)
