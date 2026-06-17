// Imports
import { apiKey } from './api_key';
import { googleSesionApi } from './google_sesion_api';
import * as googleAuth from './google-auth';

// Named exports
export {
  apiKey,
  googleAuth,
  googleSesionApi
};

// Default export
const expressAuth = {
  apiKey,
  googleSesionApi,
  googleAuth,
};

export default expressAuth;
