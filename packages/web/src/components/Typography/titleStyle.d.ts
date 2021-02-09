export default titleStyle;
declare function titleStyle(theme: any): {
    title: {
        [x: number]: {
            fontSize: string;
            marginBottom: string;
            '& small': {
                fontSize: string;
            };
        };
        color: string;
        textAlign: string;
        textDecoration: string;
        fontWeight: string;
        marginTop: string;
        marginBottom: string;
        paddingLeft: any;
        paddingRight: any;
        minHeight: string;
        '& small': {
            color: string;
            fontSize: string;
            fontWeight: string;
            lineHeight: string;
            display: string;
        };
    };
};
