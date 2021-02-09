export default cardFooterStyle;
declare namespace cardFooterStyle {
    namespace cardFooter {
        const padding: string;
        const paddingTop: string;
        const margin: string;
        const borderRadius: string;
        const justifyContent: string;
        const alignItems: string;
        const display: string;
        const backgroundColor: string;
        const border: string;
    }
    namespace cardFooterProfile {
        const marginTop: string;
    }
    namespace cardFooterPlain {
        export const paddingLeft: string;
        export const paddingRight: string;
        const backgroundColor_1: string;
        export { backgroundColor_1 as backgroundColor };
    }
    namespace cardFooterPricing {
        const zIndex: string;
    }
    namespace cardFooterTestimonial {
        const display_1: string;
        export { display_1 as display };
    }
    const cardFooterStats: {
        borderTop: string;
        marginTop: string;
        '& svg': {
            position: string;
            top: string;
            marginRight: string;
            marginLeft: string;
            width: string;
            height: string;
        };
        '& .fab,& .fas,& .far,& .fal,& .material-icons': {
            position: string;
            top: string;
            marginRight: string;
            marginLeft: string;
            fontSize: string;
            lineHeight: string;
        };
    };
    namespace cardFooterChart {
        const borderTop: string;
    }
}
