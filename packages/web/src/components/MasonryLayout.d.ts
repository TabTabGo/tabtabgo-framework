export default MasonryLayout;
declare function MasonryLayout(props: any): JSX.Element;
declare namespace MasonryLayout {
    namespace propTypes {
        const columns: PropTypes.Validator<number>;
        const gap: PropTypes.Validator<number>;
        const children: PropTypes.Requireable<PropTypes.ReactElementLike[]>;
    }
    namespace defaultProps {
        const columns_1: number;
        export { columns_1 as columns };
        const gap_1: number;
        export { gap_1 as gap };
    }
}
import PropTypes from "prop-types";
