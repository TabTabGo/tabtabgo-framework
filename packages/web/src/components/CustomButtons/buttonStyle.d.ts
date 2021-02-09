export default buttonStyle;
declare function buttonStyle(theme: any): {
    button: {
        minHeight: string;
        minWidth: string;
        backgroundColor: any;
        color: string;
        boxShadow: string;
        border: string;
        borderRadius: string;
        position: string;
        padding: string;
        margin: string;
        fontSize: string;
        fontWeight: string;
        textTransform: string;
        letterSpacing: string;
        willChange: string;
        transition: string;
        lineHeight: string;
        textAlign: string;
        whiteSpace: string;
        verticalAlign: string;
        touchAction: string;
        cursor: string;
        '&:hover,&:focus': {
            color: string;
            backgroundColor: any;
            boxShadow: string;
        };
        '& .fab,& .fas,& .far,& .fal,& .material-icons': {
            position: string;
            display: string;
            top: string;
            marginTop: string;
            marginBottom: string;
            fontSize: string;
            marginRight: string;
            verticalAlign: string;
        };
        '& svg': {
            position: string;
            display: string;
            top: string;
            width: string;
            height: string;
            marginRight: string;
            verticalAlign: string;
        };
        '&$justIcon': {
            '& .fab,& .fas,& .far,& .fal,& .material-icons': {
                marginTop: string;
                position: string;
                width: string;
                transform: string;
                left: string;
                top: string;
                height: string;
                lineHeight: string;
                fontSize: string;
            };
        };
    };
    fullWidth: {
        width: string;
    };
    primary: {
        backgroundColor: any;
        boxShadow: string;
        '&:hover,&:focus': {
            backgroundColor: any;
            boxShadow: string;
        };
    };
    info: {
        backgroundColor: any;
        boxShadow: string;
        '&:hover,&:focus': {
            backgroundColor: any;
            boxShadow: string;
        };
    };
    success: {
        backgroundColor: any;
        boxShadow: string;
        '&:hover,&:focus': {
            backgroundColor: any;
            boxShadow: string;
        };
    };
    warning: {
        backgroundColor: any;
        boxShadow: string;
        '&:hover,&:focus': {
            backgroundColor: any;
            boxShadow: string;
        };
    };
    danger: {
        backgroundColor: any;
        boxShadow: string;
        '&:hover,&:focus': {
            backgroundColor: any;
            boxShadow: string;
        };
    };
    white: {
        '&,&:focus,&:hover': {
            backgroundColor: string;
            color: any;
        };
    };
    twitter: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    facebook: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    google: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    linkedin: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    pinterest: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    youtube: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    tumblr: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    github: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    behance: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    dribbble: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    reddit: {
        backgroundColor: string;
        color: string;
        boxShadow: string;
        '&:hover,&:focus,&:visited': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    simple: {
        '&,&:focus,&:hover': {
            color: string;
            background: string;
            boxShadow: string;
        };
        '&$primary': {
            '&,&:focus,&:hover,&:visited': {
                color: any;
            };
        };
        '&$info': {
            '&,&:focus,&:hover,&:visited': {
                color: any;
            };
        };
        '&$success': {
            '&,&:focus,&:hover,&:visited': {
                color: any;
            };
        };
        '&$warning': {
            '&,&:focus,&:hover,&:visited': {
                color: any;
            };
        };
        '&$danger': {
            '&,&:focus,&:hover,&:visited': {
                color: any;
            };
        };
        '&$twitter': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$facebook': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$google': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$linkedin': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$pinterest': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$youtube': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$tumblr': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$github': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$behance': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$dribbble': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
        '&$reddit': {
            '&,&:focus,&:hover,&:visited': {
                color: string;
            };
        };
    };
    transparent: {
        '&,&:focus,&:hover': {
            color: string;
            background: string;
            boxShadow: string;
        };
    };
    disabled: {
        opacity: string;
        pointerEvents: string;
    };
    lg: {
        padding: string;
        fontSize: string;
        lineHeight: string;
        borderRadius: string;
    };
    sm: {
        padding: string;
        fontSize: string;
        lineHeight: string;
        borderRadius: string;
    };
    round: {
        borderRadius: string;
    };
    block: {
        width: string;
    };
    link: {
        '&,&:hover,&:focus': {
            backgroundColor: string;
            color: string;
            boxShadow: string;
        };
    };
    justIcon: {
        paddingLeft: string;
        paddingRight: string;
        fontSize: string;
        height: string;
        minWidth: string;
        width: string;
        '& .fab,& .fas,& .far,& .fal,& svg,& .material-icons': {
            marginRight: string;
        };
        '&$lg': {
            height: string;
            minWidth: string;
            width: string;
            lineHeight: string;
            '& .fab,& .fas,& .far,& .fal,& .material-icons': {
                fontSize: string;
                lineHeight: string;
            };
            '& svg': {
                width: string;
                height: string;
            };
        };
        '&$sm': {
            height: string;
            minWidth: string;
            width: string;
            '& .fab,& .fas,& .far,& .fal,& .material-icons': {
                fontSize: string;
                lineHeight: string;
            };
            '& svg': {
                width: string;
                height: string;
            };
        };
    };
};
