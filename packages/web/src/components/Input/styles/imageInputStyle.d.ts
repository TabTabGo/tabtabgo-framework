export default imageInputStyle;
declare function imageInputStyle(theme: any): {
    imageContainer: {
        position: string;
        marginTop: any;
        height: number;
        width: string;
    };
    image: {
        height: number;
    };
    addButton: {
        height: number;
        width: number;
        zIndex: number;
    };
    removeButton: {
        position: string;
        top: number;
        left: number;
        padding: number;
    };
    errorButton: {
        color: string;
        borderColor: string;
    };
    errorImage: {
        borderColor: string;
        borderWidth: string;
        borderStyle: string;
    };
};
