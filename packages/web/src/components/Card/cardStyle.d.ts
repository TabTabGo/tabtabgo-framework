export default cardStyle;
declare namespace cardStyle {
    namespace card {
        const border: string;
        const marginBottom: string;
        const marginTop: string;
        const borderRadius: string;
        const color: string;
        const background: string;
        const width: string;
        const boxShadow: string;
        const position: string;
        const display: string;
        const flexDirection: string;
        const minWidth: string;
        const wordWrap: string;
        const fontSize: string;
    }
    namespace cardProgress {
        const marginBottom_1: number;
        export { marginBottom_1 as marginBottom };
        const marginTop_1: number;
        export { marginTop_1 as marginTop };
        const borderRadius_1: number;
        export { borderRadius_1 as borderRadius };
        export const marginLeft: number;
        export const marginRight: number;
    }
    namespace cardPlain {
        const background_1: string;
        export { background_1 as background };
        const boxShadow_1: string;
        export { boxShadow_1 as boxShadow };
    }
    namespace cardProfile {
        const marginTop_2: string;
        export { marginTop_2 as marginTop };
        export const textAlign: string;
    }
    namespace cardBlog {
        const marginTop_3: string;
        export { marginTop_3 as marginTop };
    }
    namespace cardRaised {
        const boxShadow_2: string;
        export { boxShadow_2 as boxShadow };
    }
    const cardBackground: {
        backgroundPosition: string;
        backgroundSize: string;
        textAlign: string;
        '&:after': {
            position: string;
            zIndex: string;
            width: string;
            height: string;
            display: string;
            left: string;
            top: string;
            content: string;
            backgroundColor: string;
            borderRadius: string;
        };
        '& small': {
            color: string;
        };
    };
    const cardPricing: {
        textAlign: string;
        '&:after': {
            backgroundColor: string;
        };
        '& ul': {
            listStyle: string;
            padding: number;
            maxWidth: string;
            margin: string;
        };
        '& ul li': {
            color: string;
            textAlign: string;
            padding: string;
            borderBottom: string;
        };
        '& ul li:last-child': {
            border: number;
        };
        '& ul li b': {
            color: string;
        };
        '& h1': {
            marginTop: string;
        };
        '& h1 small': {
            display: string;
            height: number;
            fontSize: string;
        };
        '& h1 small:first-child': {
            position: string;
            top: string;
            fontSize: string;
        };
        '& ul li svg, & ul li .fab,& ul li .fas,& ul li .far,& ul li .fal,& ul li .material-icons': {
            position: string;
            top: string;
        };
    };
    const cardPricingColor: {
        '& ul li': {
            color: string;
            borderColor: string;
            '& b, & svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
                color: string;
                fontWeight: string;
            };
        };
    };
    namespace cardProduct {
        const marginTop_4: string;
        export { marginTop_4 as marginTop };
    }
    const primary: {
        background: string;
        '& h1 small': {
            color: string;
        };
        color: string;
    };
    const info: {
        background: string;
        '& h1 small': {
            color: string;
        };
        color: string;
    };
    const success: {
        background: string;
        '& h1 small': {
            color: string;
        };
        color: string;
    };
    const warning: {
        background: string;
        '& h1 small': {
            color: string;
        };
        color: string;
    };
    const danger: {
        background: string;
        '& h1 small': {
            color: string;
        };
        color: string;
    };
    const rose: {
        background: string;
        '& h1 small': {
            color: string;
        };
        color: string;
    };
    const cardChart: {
        '& p': {
            marginTop: string;
            paddingTop: string;
        };
    };
    namespace cardLogin {
        const transform: string;
        const transition: string;
    }
}
