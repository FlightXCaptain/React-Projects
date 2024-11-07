import React from 'react';
import { useMsal } from '@azure/msal-react';

function Login() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup({
      scopes: ["User.Read"],
    }).catch(e => {
      console.error(e);
    });
  };

  return (
    <button onClick={handleLogin}>Login with Microsoft</button>
  );
}

export default Login;
