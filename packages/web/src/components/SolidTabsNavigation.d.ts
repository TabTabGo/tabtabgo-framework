export default TabNavigation;
declare function TabNavigation({ className, tabs, updateParent }: {
    className?: string;
    tabs: any;
    updateParent: any;
}): JSX.Element;
declare namespace TabNavigation {
    namespace propTypes {
        const className: PropTypes.Requireable<string>;
        const tabs: PropTypes.Requireable<any[]>;
        const updateParent: PropTypes.Requireable<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
