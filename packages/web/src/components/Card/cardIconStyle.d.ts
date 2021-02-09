export default cardIconStyle;
declare function cardIconStyle(theme: any): {
    cardIcon: {
        '&$warningCardHeader,&$successCardHeader,&$errorCardHeader,&$infoCardHeader,&$primaryCardHeader': {
            borderRadius: string;
            backgroundColor: string;
            padding: string;
            marginTop: string;
            marginRight: string;
            float: string;
        };
    };
    warningCardHeader: any;
    successCardHeader: any;
    errorCardHeader: any;
    infoCardHeader: any;
    primaryCardHeader: any;
};
