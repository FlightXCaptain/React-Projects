import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

function UserManagement() {
  const { instance, accounts } = useMsal();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      const request = {
        scopes: ["User.Read"],
        account: accounts[0],
      };

      instance.acquireTokenSilent(request).then(response => {
        fetch("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        })
          .then(response => response.json())
          .then(data => setUserData(data))
          .catch(error => console.error(error));
      }).catch(error => {
        if (error instanceof InteractionRequiredAuthError) {
          instance.acquireTokenPopup(request).then(response => {
            fetch("https://graph.microsoft.com/v1.0/me", {
              headers: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            })
              .then(response => response.json())
              .then(data => setUserData(data))
              .catch(error => console.error(error));
          });
        }
      });
    }
  }, [accounts, instance]);

  return (
    <div>
      {userData ? (
        <div>
          <h3>User Information</h3>
          <p>Name: {userData.displayName}</p>
          <p>Email: {userData.mail || userData.userPrincipalName}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default UserManagement;
