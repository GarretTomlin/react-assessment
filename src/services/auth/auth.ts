import Keycloak, { KeycloakLoginOptions } from 'keycloak-js';
import axios from 'axios';

const keycloak = new Keycloak({
  realm: 'your-realm',
  url: 'http://localhost:8080/auth',
  clientId: 'your-client-id',
});

interface UserCredentials extends KeycloakLoginOptions {
  username: string;
  password: string;
  email?: string;
}

export async function login(credentials: UserCredentials) {
  try {
    await keycloak.login(credentials);
    return keycloak.tokenParsed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function register(username: string, email: string, password: string) {
  try {
    const response = await axios.post('/api/register', { username, email, password });
    const user = response.data;
    const loginCredentials: UserCredentials = { username, password };
    await keycloak.login(loginCredentials);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export function logout() {
  keycloak.logout();
}

export default keycloak;
