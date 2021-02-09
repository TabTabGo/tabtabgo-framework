export namespace rowButtons {
    namespace edit {
        function tooltip({ data, displayField, nameSingularText }: {
            data: any;
            displayField: any;
            nameSingularText: any;
        }): string;
        const icon: JSX.Element;
        function onClick(data: any, props: any): void;
    }
    namespace view {
        export function tooltip_1({ data, displayField, nameSingularText }: {
            data: any;
            displayField: any;
            nameSingularText: any;
        }): string;
        export { tooltip_1 as tooltip };
        const icon_1: JSX.Element;
        export { icon_1 as icon };
        export function onClick_1(data: any, props: any): void;
        export { onClick_1 as onClick };
    }
}
export function getRowButtons(buttons: any): {};
