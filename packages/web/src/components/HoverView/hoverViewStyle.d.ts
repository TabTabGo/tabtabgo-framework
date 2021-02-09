export default editableImageStyle;
declare namespace editableImageStyle {
    const root: {
        display: string;
        flexDirection: string;
        '&:hover': {
            '& $content': {
                transform: string;
            };
            '& $hoverContent': {
                visibility: string;
            };
        };
    };
    namespace content {
        const zIndex: number;
        const transition: string;
    }
    namespace hoverContent {
        const zIndex_1: number;
        export { zIndex_1 as zIndex };
        export const marginTop: number;
        export const textAlign: string;
        export const visibility: string;
    }
}
