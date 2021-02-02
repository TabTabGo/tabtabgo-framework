/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-console */
import React from 'react';

import swal from 'sweetalert';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import PrintIcon from '@material-ui/icons/Print';
import { mergeButtons } from '../../Buttons/utilities';
import { CircularProgress } from '@material-ui/core';
const selectedRowButtons = {
  download: {
    //label: "Download",
    tooltip: (props) => {
      const { selected, namePluralText } = props;
      return `Download ${selected.length} selected ${namePluralText}`;
    },
    icon: (props) => {
      if (props.flags && props.flags.exportingCsv)
        return <CircularProgress style={{ width: '20px', height: '20px' }} />;
      return <DownloadIcon />;
    },
    onClick: (props) => {
      const {
        actions,
        options,
        searchOptions,
        selected,
        nameSingularText,
        exportOptions,
        keyField,
      } = props;
      if (actions) {
        let entities = selected;
        if (entities && entities.length > 0) {
          actions.onExport(
            'csv',
            entities.map((item) => item[keyField]),
            { ...options, ...searchOptions },
            exportOptions || {},
          );
        } else {
          swal({
            text: `No ${nameSingularText} are selected to be exported in CSV. Please select ${nameSingularText}.`,
            icon: 'warning',
          });
        }
      } else {
        console.error('Actions is not injected');
      }
    },
  },
  pdf: {
    //label: "PDF",
    tooltip: ({ selected, namePluralText }) => {
      return `Export ${selected.length} selected ${namePluralText} as PDF`;
    },
    icon: (props) => {
      if (props.flags && props.flags.exportingPdf)
        return <CircularProgress style={{ width: '20px', height: '20px' }} />;
      return <DownloadIcon />;
    },
    onClick: ({ selected, exportsService, nameSingularText }) => {
      if (exportsService) {
        let entities = selected;

        if (entities && entities.length > 0) {
          exportsService.exportPDF(entities);
        } else {
          swal({
            text: `No ${nameSingularText} are selected to be exported in PDF. Please select ${nameSingularText}.`,
            icon: 'warning',
          });
        }
      } else {
        console.error('Exports Service is not injected');
      }
    },
  },
  print: {
    //label: "Print",
    tooltip: ({ selected, namePluralText }) => {
      return `Print ${selected.length} selected ${namePluralText}`;
    },
    icon: <PrintIcon />,
    onClick: ({ selected, exportsService, nameSingularText }) => {
      if (exportsService) {
        let entities = selected;

        if (!entities || entities.length === 0) {
          swal({
            text: `No ${nameSingularText} are selected for printing. Please select ${nameSingularText}`,
            icon: 'warning',
          });
        } else {
          exportsService.print(entities);
        }
      } else {
        console.error('Exports Service is not injected');
      }
    },
  },
  delete: {
    //label: "Delete",
    tooltip: ({ selected, namePluralText }) =>
      `Delete ${selected.length} selected ${namePluralText ? namePluralText : 'items'}`,
    icon: <DeleteIcon />,
    onClick: (props) => {
      //TODO instead of delete create onDalete
      const { selected, nameSingularText, namePluralText, actions } = props;
      if (selected && selected.length > 0 && actions && actions.onDelete) {
        swal({
          title: 'Are you sure want to continue ?',
          text: `${selected.length} ${
            selected.length > 1 ? namePluralText : nameSingularText
          } will be deleted.`,
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        }).then((result) => {
          if (result) {
            actions.onDelete(selected, {
              onSuccess: () => {
                swal({
                  text: `${selected.length} ${
                    selected.length > 1 ? namePluralText : nameSingularText
                  } are deleted successfully.`,
                  icon: 'success',
                });
                //console.log('props.search :', props.search);
                if (props.search && props.search.onSearch) {
                  props.search.onSearch();
                }
              },
              onError: () => {
                swal({
                  text: `Deleting ${selected.length} ${
                    selected.length > 1 ? namePluralText : nameSingularText
                  } failed`,
                  icon: 'error',
                });
              },
            });
          }
        });
      }
    },
  },
};

export const getSelectedRowButtons = (buttons) => {
  let finialButtons = {};
  if (buttons) {
    finialButtons = mergeButtons(buttons, selectedRowButtons);

    if (buttons.extraButtons) {
      for (const actionKey in buttons.extraButtons) {
        if (buttons.extraButtons[actionKey]) {
          finialButtons[actionKey] = buttons.extraButtons[actionKey];
        }
      }
    }
  }
  return finialButtons;
};
