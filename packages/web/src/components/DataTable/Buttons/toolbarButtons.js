/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import PrintIcon from '@material-ui/icons/Print';
import swal from 'sweetalert';
import ColumnView from './components/ColumnView';
import { mergeButtons } from '../../Buttons/utilities';
import Refresh from '@material-ui/icons/Refresh';
import { CircularProgress } from '@material-ui/core';
export const headerButtons = {
  search: {
    //label: "Search",
    tooltip: ({ namePluralText }) => {
      return `Search in ${namePluralText}`;
    },
    icon: <SearchIcon />,
    onClick: (props) => {
      if (props.actions && props.actions.onViewFilter) {
        props.actions.onViewFilter();
      }
    },
  },
  viewColumn: {
    //label: "Columns",
    // eslint-disable-next-line react/display-name
    component: (props, key) => {
      // eslint-disable-next-line react/prop-types
      const { classes, ...rest } = props;
      const { root, formControl, spacer, actions, title } = classes;
      return (
        <ColumnView classes={{ root, formControl, spacer, actions, title }} {...rest} key={key} />
      );
    },
  },
  download: {
    //label: "Download",
    tooltip: ({ namePluralText }) => {
      return `Download all ${namePluralText} in CSV`;
    },
    icon: (props) => {
      if (props.flags && props.flags.exportingCsv)
        return <CircularProgress style={{ width: '20px', height: '20px' }} />;
      return <DownloadIcon />;
    },
    onClick: (props) => {
      //TODO add function call onExport
      const { actions, options, searchOptions, exportOptions } = props;
      if (actions) {
        actions.onExport('csv', [], { ...options, ...searchOptions }, exportOptions || {});
      } else {
        console.error('Exports Service is not injected');
      }
    },
  },
  pdf: {
    //label: "Download Pdf",
    tooltip: ({ namePluralText }) => {
      return `Download all ${namePluralText} in pdf`;
    },
    icon: (props) => {
      if (props.flags && props.flags.exportingPdf)
        return <CircularProgress style={{ width: '20px', height: '20px' }} />;
      return <DownloadIcon />;
    },
    onClick: ({ data, exportsService, nameSingularText }) => {
      if (exportsService) {
        //TODO load all data
        let entities = data;

        if (!entities || entities.length === 0) {
          swal({
            text: `No ${nameSingularText} data available to export as PDF.`,
            icon: 'warning',
          });
        } else {
          exportsService.exportPDF(entities);
        }
      } else {
        console.error('Exports Service is not injected');
      }
    },
  },
  print: {
    //label: "Print",
    tooltip: ({ namePluralText }) => {
      return `Print all ${namePluralText}`;
    },
    icon: <PrintIcon />,
    onClick: ({ data, exportsService, nameSingularText }) => {
      if (exportsService) {
        //TODO load all data
        let entities = data;

        if (!entities || entities.length === 0) {
          swal({
            text: `No ${nameSingularText} data available for printing.`,
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
  filter: {
    //label: "Filter",
    tooltip: 'Filter',
    icon: <FilterListIcon />,
    onClick: (props) => {
      if (props.actions && props.actions.onViewFilter) {
        props.actions.onViewFilter();
      }
    },
  },
  refresh: {
    tooltip: 'Refresh',
    icon: <Refresh />,
    onClick: (props) => {
      if (props.actions && props.actions.onRefresh) {
        props.actions.onRefresh();
      }
    },
  },
};

export const getToolbarButtons = (buttons) => {
  let finialButtons = {};
  if (buttons) {
    finialButtons = mergeButtons(buttons, headerButtons);

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
