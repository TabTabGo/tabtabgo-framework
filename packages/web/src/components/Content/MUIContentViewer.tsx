import React, { ReactElement } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import styles from './styles/contentViewerStyle';
import MUIRichTextEditor from 'mui-rte';

const useStyle = makeStyles(styles);

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 10,
        width: '100%',
      },
      container: {
        margin: 0,
        background: 'white',
        paddingBottom: 2,
        borderRadius: 0,
      },
    },
  },
});

// Used for Draftjs directly
// const MediaComponent = (props: any) => {

//   const { block, contentState } = props;

//   const data = contentState.getEntity(block.getEntityAt(0)).getData();
//   // Return a <figure> or some other content using this data.
//   console.log('data', data);
//   if (data?.type === "image") {
//     return <img src={data.url} height={data.height} width={data.width} />
//   }
//   return <div />
// }

// const customBlockRenderer = (contentBlock: ContentBlock) => {
//   const type = contentBlock.getType();
//   if (type === 'atomic') {
//     return {
//       component: MediaComponent,
//       editable: false
//     };
//   }
// }

type ContentViewerProps = {
  content?: Draft.RawDraftContentState;
};

const ContentViewer = ({ content }: ContentViewerProps) => {
  const classes = useStyle();
  if (content)
    return (
      <MuiThemeProvider theme={defaultTheme}>
        <MUIRichTextEditor
          defaultValue={JSON.stringify(content)}
          readOnly
          toolbar={false}
          inlineToolbar={false}
        />
      </MuiThemeProvider>
    );

  return null;
};

export default withStyles(styles)(ContentViewer);
