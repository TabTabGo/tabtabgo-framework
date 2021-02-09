export default cardBodyStyle;
declare namespace cardBodyStyle {
    namespace cardBody {
        const padding: string;
        const flex: string;
        const WebkitBoxFlex: string;
        const position: string;
    }
    namespace cardBodyBackground {
        const position_1: string;
        export { position_1 as position };
        export const zIndex: string;
        export const minHeight: string;
        export const paddingTop: string;
        export const paddingBottom: string;
        export const maxWidth: string;
        export const margin: string;
    }
    namespace cardBodyPlain {
        const paddingLeft: string;
        const paddingRight: string;
    }
    const cardBodyFormHorizontal: {
        paddingLeft: string;
        paddingRight: string;
        '& form': {
            margin: string;
        };
    };
    namespace cardPricing {
        const padding_1: string;
        export { padding_1 as padding };
        const margin_1: string;
        export { margin_1 as margin };
    }
    namespace cardSignup {
        const padding_2: string;
        export { padding_2 as padding };
    }
    const cardBodyColor: {
        borderRadius: string;
        '&': {
            'h1, h2, h3': {
                '& small': {
                    color: string;
                };
            };
        };
    };
    namespace cardBodyProfile {
        const marginTop: string;
    }
    namespace cardBodyCalendar {
        const padding_3: string;
        export { padding_3 as padding };
    }
}
