export default wizardStyle;
declare function wizardStyle(theme: any): {
    root: {
        width: string;
    };
    completed: {
        display: string;
    };
    instructions: {
        marginTop: any;
        marginBottom: any;
    };
    button: {
        marginRight: any;
    };
    backButton: {
        marginRight: any;
    };
    card: {
        display: string;
        position: string;
        width: string;
        margin: string;
        boxShadow: string;
        borderRadius: string;
        color: string;
        background: string;
        transition: string;
        minHeight: string;
    };
    wizardNavigation: {
        position: string;
    };
    nav: {
        marginTop: string;
        paddingLeft: string;
        marginBottom: string;
        listStyle: string;
        backgroundColor: string;
        '&:after,&:before': {
            display: string;
            content: string;
        };
        '&:after': {
            boxSizing: string;
        };
    };
    steps: {
        marginLeft: string;
        textAlign: string;
        position: string;
        display: string;
    };
    stepLabel: {};
    stepButton: {};
    stepsAnchor: {
        cursor: string;
        position: string;
        display: string;
        padding: string;
        textDecoration: string;
        transition: string;
        border: string;
        borderRadius: string;
        lineHeight: string;
        fontSize: string;
        fontWeight: string;
        minWidth: string;
        textAlign: string;
        color: string;
    };
    stepsDisabledAnchor: {
        position: string;
        display: string;
        padding: string;
        textDecoration: string;
        transition: string;
        border: string;
        borderRadius: string;
        lineHeight: string;
        fontSize: string;
        fontWeight: string;
        minWidth: string;
        textAlign: string;
    };
    content: {
        marginTop: string;
        minHeight: string;
        padding: string;
    };
    stepContent: {
        display: string;
    };
    stepContentActive: {
        display: string;
    };
    movingTab: {
        position: string;
        textAlign: string;
        padding: string;
        fontSize: string;
        WebkitFontSmoothing: string;
        top: string;
        left: string;
        borderRadius: string;
        color: string;
        cursor: string;
        fontWeight: string;
    };
    primary: {
        backgroundColor: any;
        boxShadow: string;
    };
    warning: {
        backgroundColor: any;
        boxShadow: string;
    };
    danger: {
        backgroundColor: any;
        boxShadow: string;
    };
    success: {
        backgroundColor: any;
        boxShadow: string;
    };
    info: {
        backgroundColor: any;
        boxShadow: string;
    };
    footer: {
        padding: string;
    };
    left: {
        float: string;
    };
    right: {
        float: string;
    };
    clearfix: {
        '&:after,&:before': {
            display: string;
            content: string;
        };
        clear: string;
    };
    navTitle: {
        width: string;
    };
    navSubtitle: {
        width: string;
    };
    movingTabTitle: {
        width: string;
        color: string;
    };
    movingTabSubtitle: {
        width: string;
        color: string;
    };
};
