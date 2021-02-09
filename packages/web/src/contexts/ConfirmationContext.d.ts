export const ConfirmationContext: React.Context<{
    confirmAction: (title: any, text: any, onConfirm: any) => void;
}>;
export class ConfirmationDialogProvider extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    confirm: (title: any, text: any, onConfirm: any) => void;
    closeModal: (e: any) => void;
}
export function withConfirmation(WrapperComponent: any): (props: any) => JSX.Element;
import React from "react";
