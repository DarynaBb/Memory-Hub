import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { StudySetsContextProvider } from './context/StudySetsContext.jsx'
import { UserStudySetsContext, UserStudySetsContextProvider } from './context/UserStudySetsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <UserStudySetsContextProvider>
      <StudySetsContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </StudySetsContextProvider>
    </UserStudySetsContextProvider>
 // </React.StrictMode>,
)
