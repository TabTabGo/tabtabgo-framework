import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { AppSettings } from '@tabtabgo/core/Appsettings';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: theme.palette.error.main,
        color: 'white',
    },
    errorMessage: {
        fontWeight: 'bold',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    errorContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        borderRadius: 4,
        backgroundColor: grey[100],
    },
    errorText: {
        marginBottom: 0,
    },
    actions: {
        backgroundColor: grey[50],
    },
}));
export const ErrorModal = ({ isError, onClose, error }) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation(AppSettings.translationNamespaces);
    console.log('error :', error);
    if (error) {
        return (_jsxs(Dialog, Object.assign({ fullScreen: fullScreen, open: isError, onClose: onClose, "aria-labelledby": t('common:An error has occurred') }, { children: [_jsx(DialogTitle, Object.assign({ className: classes.title, id: "error-dialog-title" }, { children: error.title ? error.title : t('common:An error has occurred') }), void 0),
                _jsxs(DialogContent, { children: [_jsx(DialogContentText, Object.assign({ className: classes.errorMessage }, { children: error.message }), void 0),
                        error.errors
                            ? Object.keys(error.errors).map((eKey, index) => (_jsx("div", Object.assign({ className: classes.errorContainer }, { children: _jsxs(DialogContentText, Object.assign({ className: classes.errorText }, { children: [_jsxs("strong", { children: [eKey, ":"] }, void 0), ' ', typeof error.errors[eKey] === 'object'
                                            ? JSON.stringify(error.errors[eKey])
                                            : error.errors[eKey]] }), void 0) }), index)))
                            : null] }, void 0),
                _jsx(DialogActions, Object.assign({ className: classes.actions }, { children: _jsx(Button, Object.assign({ onClick: onClose, autoFocus: true }, { children: t('common:Dismiss') }), void 0) }), void 0)] }), void 0));
    }
    return null;
};
