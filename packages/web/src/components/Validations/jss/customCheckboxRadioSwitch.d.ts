export default customCheckboxRadioSwitch;
declare function customCheckboxRadioSwitch(theme: any): {
    checkRoot: {
        padding: string;
    };
    radioRoot: {
        padding: string;
    };
    checkboxAndRadio: {
        position: string;
        display: string;
        marginTop: string;
        marginBottom: string;
    };
    checkboxAndRadioHorizontal: {
        position: string;
        display: string;
        '&:first-child': {
            marginTop: string;
        };
        '&:not(:first-child)': {
            marginTop: string;
        };
        marginTop: string;
        marginBottom: string;
    };
    checked: {
        color: string;
    };
    checkedIcon: {
        width: string;
        height: string;
        border: string;
        borderRadius: string;
    };
    uncheckedIcon: {
        width: string;
        height: string;
        padding: string;
        border: string;
        borderRadius: string;
    };
    disabledCheckboxAndRadio: {
        '& $checkedIcon,& $uncheckedIcon,& $radioChecked,& $radioUnchecked': {
            borderColor: string;
            opacity: string;
            color: string;
        };
    };
    label: {
        cursor: string;
        paddingLeft: string;
        color: string;
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
        display: string;
        transition: string;
    };
    labelHorizontal: {
        color: string;
        cursor: string;
        display: string;
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
        paddingTop: string;
        marginRight: string;
        '@media (min-width: 992px)': {
            float: string;
        };
    };
    labelHorizontalRadioCheckbox: {
        paddingTop: string;
    };
    labelLeftHorizontal: {
        color: string;
        cursor: string;
        display: string;
        fontSize: string;
        lineHeight: string;
        fontWeight: string;
        paddingTop: string;
        marginRight: string;
    };
    labelError: {
        color: any;
    };
    radio: {
        color: string;
    };
    radioChecked: {
        width: string;
        height: string;
        border: string;
        borderRadius: string;
    };
    radioUnchecked: {
        width: string;
        height: string;
        padding: string;
        border: string;
        borderRadius: string;
    };
    inlineChecks: {
        marginTop: string;
    };
    iconCheckbox: {
        height: string;
        width: string;
        color: any;
        padding: string;
        margin: string;
        '& > span:first-child': {
            borderWidth: string;
            borderStyle: string;
            borderColor: string;
            textAlign: string;
            verticalAlign: string;
            borderRadius: string;
            color: string;
            transition: string;
        };
        '&:hover': {
            color: any;
            '& > span:first-child': {
                borderColor: any;
            };
        };
    };
    iconCheckboxChecked: {
        color: any;
        '& > span:first-child': {
            borderColor: any;
        };
    };
    iconCheckboxIcon: {
        fontSize: string;
        lineHeight: string;
    };
    switchBase: {
        color: string;
    };
    switchIcon: {
        boxShadow: string;
        color: string;
        border: string;
        transform: string;
    };
    switchIconChecked: {
        borderColor: string;
        transform: string;
    };
    switchBar: {
        width: string;
        height: string;
        backgroundColor: string;
        borderRadius: string;
        opacity: string;
    };
    switchChecked: {
        '& + $switchBar': {
            backgroundColor: string;
        };
    };
};
