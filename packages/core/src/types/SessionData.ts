import { AuthenticateResponse } from './AuthenticateResponse';
import { SessionInstance } from '../types/SessionInstance';
import { SessionUser } from '../types/SessionUser';

export interface SessionData {
  user?: SessionUser;
  menus?: Array<string> | null;
  instance?: SessionInstance;
}

export interface AuthenticateData extends SessionData, AuthenticateResponse {
  isAuthenticated: boolean;
}
