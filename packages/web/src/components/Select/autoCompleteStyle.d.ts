export default styles;
declare function styles(theme: any): {
    root: {
        flexGrow: number;
    };
    input: {
        display: string;
        minWidth: string;
    };
    valueContainer: {
        display: string;
        flexWrap: string;
        flex: number;
    };
    container: {
        marginTop: string;
    };
    chip: {
        margin: string;
        height: any;
        '& svg': {
            margin: number;
        };
    };
    chipFocused: {
        backgroundColor: string;
    };
    noOptionsMessage: {
        padding: string;
    };
    singleValue: {
        fontSize: number;
        fontWeight: number;
    };
    placeholder: {
        fontSize: number;
    };
    paper: {
        position: string;
        zIndex: number;
        marginTop: any;
        left: number;
        right: number;
    };
    divider: {
        height: any;
    };
};
