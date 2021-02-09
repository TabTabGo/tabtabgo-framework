export interface INotificationService {
    notifySuccess(message: string, options?: any): void;
    notifyError(message: string, options?: any): void;
}
