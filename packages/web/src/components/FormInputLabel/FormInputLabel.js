import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function FormInputLabel(props) {
    const { ignoreLabelSuffix, isRequired, label } = props;
    if (!ignoreLabelSuffix) {
        if (!isRequired && label && typeof label === 'string') {
            return (_jsxs("span", { children: [label + ' ', _jsx("small", { children: ' (Optional)' }, void 0)] }, void 0));
        }
    }
    return label;
}
