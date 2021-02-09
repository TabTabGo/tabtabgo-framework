export function snackbarReducer(state: {
    notifications: any[];
}, action: any): {
    notifications: any[];
};
export function enqueueSnackbar(notification: any): {
    type: string;
    notification: any;
};
export function closeSnackbar(key: any): {
    type: string;
    dismissAll: boolean;
    key: any;
};
export function removeSnackbar(key: any): {
    type: string;
    key: any;
};
