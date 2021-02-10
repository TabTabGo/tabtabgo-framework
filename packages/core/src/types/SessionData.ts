import { AuthenticateResponse } from './AuthenticateResponse';
import { SessionInstance } from './SessionInstance';
import { SessionUser } from './SessionUser';

export interface SessionData {
  user?: SessionUser;
  menus?: Array<string> | null;
  instance?: SessionInstance;
}

export interface AuthenticateData extends SessionData, AuthenticateResponse {
  isAuthenticated: boolean;
}
