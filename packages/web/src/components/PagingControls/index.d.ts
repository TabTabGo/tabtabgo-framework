export default PagingControls;
declare class PagingControls extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
}
declare namespace PagingControls {
    namespace propTypes {
        const totalPages: PropTypes.Validator<number>;
        const page: PropTypes.Validator<number>;
        const prevPageNumber: PropTypes.Requireable<number>;
        const nextPageNumber: PropTypes.Requireable<number>;
        const firstPageNumber: PropTypes.Requireable<number>;
        const lastPageNumber: PropTypes.Requireable<number>;
        const goToPage: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import React from "react";
import PropTypes from "prop-types";
