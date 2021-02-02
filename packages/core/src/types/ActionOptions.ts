export interface ActionOptions {
  onSuccess(successData?: any): void;
  onError?(error: any): void;
  successMessage?: string;
  failedMessage?: string;
  redirectUrl?: string;
  properties?: any;
}
