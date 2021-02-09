export namespace headerButtons {
    namespace search {
        function tooltip({ namePluralText }: {
            namePluralText: any;
        }): string;
        const icon: JSX.Element;
        function onClick(props: any): void;
    }
    namespace viewColumn {
        function component(props: any, key: any): JSX.Element;
    }
    namespace download {
        export function tooltip_1({ namePluralText }: {
            namePluralText: any;
        }): string;
        export { tooltip_1 as tooltip };
        export function icon_1(props: any): JSX.Element;
        export { icon_1 as icon };
        export function onClick_1(props: any): void;
        export { onClick_1 as onClick };
    }
    namespace pdf {
        export function tooltip_2({ namePluralText }: {
            namePluralText: any;
        }): string;
        export { tooltip_2 as tooltip };
        export function icon_2(props: any): JSX.Element;
        export { icon_2 as icon };
        export function onClick_2({ data, exportsService, nameSingularText }: {
            data: any;
            exportsService: any;
            nameSingularText: any;
        }): void;
        export { onClick_2 as onClick };
    }
    namespace print {
        export function tooltip_3({ namePluralText }: {
            namePluralText: any;
        }): string;
        export { tooltip_3 as tooltip };
        const icon_3: JSX.Element;
        export { icon_3 as icon };
        export function onClick_3({ data, exportsService, nameSingularText }: {
            data: any;
            exportsService: any;
            nameSingularText: any;
        }): void;
        export { onClick_3 as onClick };
    }
    namespace filter {
        const tooltip_4: string;
        export { tooltip_4 as tooltip };
        const icon_4: JSX.Element;
        export { icon_4 as icon };
        export function onClick_4(props: any): void;
        export { onClick_4 as onClick };
    }
    namespace refresh {
        const tooltip_5: string;
        export { tooltip_5 as tooltip };
        const icon_5: JSX.Element;
        export { icon_5 as icon };
        export function onClick_5(props: any): void;
        export { onClick_5 as onClick };
    }
}
export function getToolbarButtons(buttons: any): {};
