import { jsx as _jsx } from "react/jsx-runtime";
import defaultInputLabel from './components/FormInputLabel/FormInputLabel';
import { ErrorModal } from './components/ErrorModal/ErrorModal';
export const WebComponentProvider = ({ errorModal, formInputLabel }) => {
    return {
        getErrorModal: (props) => {
            //("errorModel :", errorModel);
            if (errorModal) {
                return errorModal;
            }
            return _jsx(ErrorModal, Object.assign({}, props), void 0);
        },
        getFormInputLabel: (props) => {
            if (formInputLabel) {
                return formInputLabel(props);
            }
            return defaultInputLabel(props);
        },
    };
};
