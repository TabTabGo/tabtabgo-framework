export class SwipeableTabsContainer extends React.Component<any, any, any> {
    static propTypes: {
        tabs: PropTypes.Validator<PropTypes.InferProps<{
            label: PropTypes.Requireable<string>;
            key: PropTypes.Requireable<string>;
            component: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        }>[]>;
        swipeable: PropTypes.Requireable<boolean>;
        theme: PropTypes.Requireable<object>;
        classes: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        swipeable: boolean;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    handleTabChange: (event: any, activeTab: any) => void;
    handleTabIndexChange: (index: any) => void;
}
declare var _default: React.ComponentType<Pick<any, string | number | symbol> & import("@material-ui/core").StyledComponentProps<"root" | "container" | "selectedTab">>;
export default _default;
import React from "react";
import PropTypes from "prop-types";
