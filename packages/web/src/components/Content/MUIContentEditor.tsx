import React, { useState, useRef } from 'react';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import BackupIcon from '@material-ui/icons/Backup';
import MUIRichTextEditor from 'mui-rte';
import {
  TMUIRichTextEditorProps,
  TMUIRichTextEditorRef,
  TAsyncAtomicBlockResponse,
} from 'mui-rte/src/MUIRichTextEditor';
import UploadImagePopover from './UploadImagePopover';

export type MUIContentEditor = Partial<TMUIRichTextEditorProps> & {
  value?: Draft.RawDraftContentState;
  defaultValue?: Draft.RawDraftContentState;
  onChange: (content: object) => void;
  uploadFile?: (file: File) => Promise<string>;
};

const MUIContentEditor = ({
  value,
  onChange,
  uploadFile,
  defaultValue,
  ...props
}: MUIContentEditor) => {
  const ref = useRef<TMUIRichTextEditorRef>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const uploadImage = (
    file: File,
    alignment?: 'left' | 'center' | 'right',
    type?: 'image' | 'video',
  ) => {
    return new Promise<TAsyncAtomicBlockResponse>(async (resolve, reject) => {
      const url = uploadFile ? await uploadFile(file) : undefined;
      if (!url) {
        reject();
        return;
      }
      resolve({
        data: {
          url: url,
          width: 300,
          height: 200,
          alignment: alignment || 'left',
          type: type || 'image',
        },
      });
    });
  };

  const handleFileUpload = (file: File) => {
    ref.current?.insertAtomicBlockAsync('IMAGE', uploadImage(file), 'Uploading now...');
  };

  const onEditorStateChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();

    onChange(convertToRaw(contentState));
  };
  //console.log('defaultValue', defaultValue, value)
  return (
    <>
      <UploadImagePopover
        anchor={anchor}
        onSubmit={(data, insert) => {
          if (insert && data.file) {
            handleFileUpload(data.file);
          }
          //setAnchor(null)
        }}
      />
      <MUIRichTextEditor
        ref={ref}
        label="Type something here..."
        controls={[
          'title',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'highlight',
          'undo',
          'redo',
          'link',
          'media',
          'upload-image',
          'numberList',
          'bulletList',
          'quote',
          'code',
          'clear',
          'save',
        ]}
        inlineToolbar={true}
        customControls={[
          {
            name: 'upload-image',
            icon: <BackupIcon />,
            type: 'callback',
            onClick: (_editorState, _name, anchor) => {
              setAnchor(anchor);
            },
          },
        ]}
        draftEditorProps={{
          handleDroppedFiles: (_selectionState, files) => {
            if (files.length && (files[0] as File).name !== undefined) {
              handleFileUpload(files[0] as File);
              return 'handled';
            }
            return 'not-handled';
          },
        }}
        defaultValue={defaultValue ? JSON.stringify(defaultValue) : undefined}
        onChange={onEditorStateChange}
        {...props}
      />
    </>
  );
};

export default MUIContentEditor;

// export const convertHtmlToDraft = content => {
//   if (content) {
//     if (typeof content === "string") {
//       const contentBlock = htmlToDraft(content);
//       return contentBlock
//         ? EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock))
//         : EditorState.createEmpty();
//     } else {
//       return content;
//     }
//   }
//   return EditorState.createEmpty();
// };

// export const convertDraftToHtml = editorState => {
//   let content = editorState.getCurrentContent();
//   if (content) return draftToHtml(convertToRaw(content));
//   return "<p></p>";
// };
