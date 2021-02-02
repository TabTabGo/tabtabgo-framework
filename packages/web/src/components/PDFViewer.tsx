import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Document } from 'react-pdf/dist/entry.webpack';
import { Page } from 'react-pdf';
import Pagination from '@material-ui/lab/Pagination';

import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: any) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

type PDFViewerProps = {
  title: string;
  open: boolean;
  getPDFFile: () => Promise<any>;
  onClose: () => void;
};

const PDFViewer = ({ open, onClose, title, getPDFFile }: PDFViewerProps) => {
  const classes = useStyles();
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pdfPages, setPdfPages] = useState<number>();
  const [pdfPageNumber, setPdfPageNumber] = useState(1);
  const [pdfBase64, setPdfBase64] = useState<string>();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    loadPdf();
  }, []);

  async function loadPdf() {
    setLoadingPdf(true);
    var blob = await getPDFFile();
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      setPdfBase64(`data:application/pdf;${reader.result}`);
      setLoadingPdf(false);
    };
  }

  const handleOnPageChange = (e: any, page: number) => {
    setPdfPageNumber(page);
  };

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setPdfPages(numPages);
  };
  return (
    <Dialog
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">
        <Typography variant="h5">{title}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {loadingPdf ? (
          <Grid container justify="center">
            <Grid item>
              <CircularProgress size={20} />
            </Grid>
          </Grid>
        ) : (
          <Document file={pdfBase64} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pdfPageNumber} />
          </Document>
        )}
      </DialogContent>
      <DialogActions>
        <Grid justify="center">
          <Grid item>
            <Pagination count={pdfPages} onChange={handleOnPageChange} />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default PDFViewer;
