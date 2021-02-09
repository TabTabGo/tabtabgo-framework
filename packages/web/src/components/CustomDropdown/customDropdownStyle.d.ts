export default customDropdownStyle;
declare function customDropdownStyle(theme: any): {
    popperClose: {
        pointerEvents: string;
        display: string;
    };
    pooperNav: {
        [x: number]: {
            position: string;
            left: string;
            top: string;
            transform: string;
            willChange: string;
            '& > div': {
                boxShadow: string;
                marginLeft: string;
                marginRight: string;
                transition: string;
                marginTop: string;
                marginBottom: string;
                padding: string;
            };
        };
    };
    manager: {
        '& > div > button:first-child > span:first-child, & > div > a:first-child > span:first-child': {
            width: string;
        };
    };
    innerManager: {
        '& > div > button,& > div > a': {
            margin: string;
            color: string;
            padding: string;
            '& > span:first-child': {
                width: string;
                justifyContent: string;
            };
        };
    };
    target: {
        '& > button:first-child > span:first-child, & > a:first-child > span:first-child': {
            display: string;
        };
        '& $caret': {
            marginLeft: string;
        };
    };
    dropdown: {
        borderRadius: string;
        border: string;
        boxShadow: string;
        top: string;
        zIndex: string;
        minWidth: string;
        padding: string;
        margin: string;
        fontSize: string;
        textAlign: string;
        listStyle: string;
        backgroundColor: string;
        backgroundClip: string;
    };
    menuList: {
        padding: string;
    };
    pooperResponsive: {
        [x: number]: {
            zIndex: string;
            position: string;
            float: string;
            width: string;
            marginTop: string;
            backgroundColor: string;
            border: string;
            boxShadow: string;
            color: string;
        };
        zIndex: string;
    };
    dropdownItem: any;
    darkHover: {
        '&:hover': {
            boxShadow: string;
            backgroundColor: string;
            color: string;
        };
    };
    primaryHover: {
        '&:hover': any;
    };
    infoHover: {
        '&:hover': any;
    };
    successHover: {
        '&:hover': any;
    };
    warningHover: {
        '&:hover': any;
    };
    dangerHover: {
        '&:hover': any;
    };
    dropdownDividerItem: {
        margin: string;
        backgroundColor: string;
        height: string;
        overflow: string;
    };
    buttonIcon: {
        width: string;
        height: string;
    };
    caret: {
        transition: string;
        display: string;
        width: string;
        height: string;
        marginLeft: string;
        verticalAlign: string;
        borderTop: string;
        borderRight: string;
        borderLeft: string;
    };
    caretActive: {
        transform: string;
    };
    caretDropup: {
        transform: string;
    };
    dropdownHeader: {
        display: string;
        padding: string;
        fontSize: string;
        lineHeight: string;
        color: string;
        whiteSpace: string;
        fontWeight: string;
        marginTop: string;
        '&:hover,&:focus': {
            backgroundColor: string;
            cursor: string;
        };
    };
    noLiPadding: {
        padding: string;
    };
};
