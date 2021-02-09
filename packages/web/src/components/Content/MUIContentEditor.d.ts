/// <reference types="draft-js" />
/// <reference types="react" />
import { TMUIRichTextEditorProps } from 'mui-rte/src/MUIRichTextEditor';
export declare type MUIContentEditor = Partial<TMUIRichTextEditorProps> & {
    value?: Draft.RawDraftContentState;
    defaultValue?: Draft.RawDraftContentState;
    onChange: (content: object) => void;
    uploadFile?: (file: File) => Promise<string>;
};
declare const MUIContentEditor: ({ value, onChange, uploadFile, defaultValue, ...props }: MUIContentEditor) => JSX.Element;
export default MUIContentEditor;
