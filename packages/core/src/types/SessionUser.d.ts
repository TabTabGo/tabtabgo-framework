import { SessionInstance } from './SessionInstance';
export interface SessionUser {
    displayName: string;
    [key: string]: any;
    roles: Array<string>;
    avatar?: any;
    instances?: Array<SessionInstance>;
    profile?: any;
}
