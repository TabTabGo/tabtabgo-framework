import { AnyAction } from 'redux';
export interface Action extends AnyAction {
    payload: any;
    actionName?: string;
    actionValue?: any;
}
