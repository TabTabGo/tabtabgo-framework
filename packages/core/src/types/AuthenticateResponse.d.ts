export interface AuthenticateResponse {
    success: boolean;
    message?: string;
    code?: String;
    [key: string]: any;
}
