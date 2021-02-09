/// <reference types="react" />
declare type PDFViewerProps = {
    title: string;
    open: boolean;
    getPDFFile: () => Promise<any>;
    onClose: () => void;
};
declare const PDFViewer: ({ open, onClose, title, getPDFFile }: PDFViewerProps) => JSX.Element;
export default PDFViewer;
