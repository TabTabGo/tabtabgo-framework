export default cardHeaderStyle;
declare function cardHeaderStyle(theme: any): {
    cardHeader: {
        padding: string;
        marginBottom: string;
        borderBottom: string;
        background: string;
        zIndex: string;
        '&$cardHeaderPlain,&$cardHeaderImage,&$cardHeaderContact,&$cardHeaderSignup,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$errorCardHeader,&$infoCardHeader,&$primaryCardHeader': {
            margin: string;
            padding: string;
            position: string;
            color: string;
        };
        '&:first-child': {
            borderRadius: string;
        };
        '&$warningCardHeader,&$successCardHeader,&$errorCardHeader,&$infoCardHeader,&$primaryCardHeader': {
            '&:not($cardHeaderIcon):not($cardHeaderImage):not($cardHeaderText)': {
                borderRadius: string;
                marginTop: string;
                padding: string;
            };
        };
        '&$cardHeaderStats svg': {
            fontSize: string;
            lineHeight: string;
            textAlign: string;
            width: string;
            height: string;
            margin: string;
        };
        '&$cardHeaderStats .fab,&$cardHeaderStats .fas,&$cardHeaderStats .far,&$cardHeaderStats .fal,&$cardHeaderStats .material-icons': {
            fontSize: string;
            lineHeight: string;
            width: string;
            height: string;
            textAlign: string;
            overflow: string;
            marginBottom: string;
        };
        '&$cardHeaderStats$cardHeaderIcon': {
            textAlign: string;
        };
        '&$cardHeaderImage': {
            marginLeft: string;
            marginRight: string;
            marginTop: string;
            borderRadius: string;
        };
        '&$cardHeaderText': {
            display: string;
        };
    };
    cardHeaderPlain: {
        marginLeft: string;
        marginRight: string;
        '&$cardHeaderImage': {
            margin: string;
        };
    };
    cardHeaderImage: {
        position: string;
        padding: string;
        zIndex: string;
        '& img': {
            width: string;
            borderRadius: string;
            pointerEvents: string;
            boxShadow: string;
        };
        '& a': {
            display: string;
        };
    };
    cardHeaderContact: {
        margin: string;
        marginTop: string;
    };
    cardHeaderSignup: {
        marginLeft: string;
        marginRight: string;
        marginTop: string;
        padding: string;
        width: string;
        marginBottom: string;
    };
    cardHeaderStats: {
        '& $cardHeaderIcon': {
            textAlign: string;
        };
        '& h1,& h2,& h3,& h4,& h5,& h6': {
            margin: string;
        };
    };
    cardHeaderIcon: {
        '&$warningCardHeader,&$successCardHeader,&$errorCardHeader,&$infoCardHeader,&$primaryCardHeader': {
            background: string;
            boxShadow: string;
        };
        '& .fab,& .fas,& .far,& .fal,& .material-icons': {
            width: string;
            height: string;
            textAlign: string;
            lineHeight: string;
        };
        '& svg': {
            width: string;
            height: string;
            textAlign: string;
            lineHeight: string;
            margin: string;
        };
    };
    cardHeaderText: {};
    warningCardHeader: {
        color: string;
        '&:not($cardHeaderText):not($cardHeaderIcon)': any;
    };
    successCardHeader: {
        color: string;
        '&:not($cardHeaderText):not($cardHeaderIcon)': any;
    };
    errorCardHeader: {
        color: string;
        '&:not($cardHeaderText):not($cardHeaderIcon)': any;
    };
    infoCardHeader: {
        color: string;
        '&:not($cardHeaderText):not($cardHeaderIcon)': any;
    };
    primaryCardHeader: {
        color: string;
        '&:not($cardHeaderText):not($cardHeaderIcon)': any;
    };
};
