import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "ee149189-0712-4e6f-ac6f-653e16f78602", // Replace with your client ID
    authority: "https://login.microsoftonline.com/d63f15df-3a89-451f-8dd3-eeaa926f7580", // Replace with your tenant ID
    redirectUri: "http://localhost:3000", // Replace with your redirect URI
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
