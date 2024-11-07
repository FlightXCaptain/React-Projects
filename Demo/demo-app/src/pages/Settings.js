import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import msalInstance from '../msalConfig';
import Login from '../components/Login';
import UserManagement from '../components/UserManagement';

function Settings() {
  return (
    <MsalProvider instance={msalInstance}>
      <div>
        <h2>Settings</h2>
        <p>Welcome to the Settings page.</p>
        <Login />
        <UserManagement />
      </div>
    </MsalProvider>
  );
}

export default Settings;
