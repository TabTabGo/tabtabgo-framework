import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import {} from 'draft-js';
import styles from './styles/contentViewerStyle.jsx';
const useStyle = makeStyles(styles);

type ContentViewerProps = {
  content?: any;
};

const ContentViewer = ({ content }: ContentViewerProps) => {
  const classes = useStyle();
  let htmlView = content ? <p dangerouslySetInnerHTML={{ __html: draftToHtml(content) }} /> : '_';

  return <div className={classes.root}>{htmlView}</div>;
};

export default withStyles(styles)(ContentViewer);
