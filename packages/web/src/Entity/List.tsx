/* eslint-disable no-console */
import React, { useState, useLayoutEffect, useRef } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import DataTable, { EntityDataTableProps, EntityDataTableRef } from './DataTable';

import ContentWrapper from 'layouts/components/Content/ContentWrapper';
import { mergeButtons, mergeButtonSections, ToolbarButtons } from '../components/Buttons';

import Add from '@material-ui/icons/Add';
import { IActions, IEntity } from '@tabtabgo/core/types';
import { Buttons } from '@tabtabgo/core/types/DataTable';

export type ModalModeType = 'Edit' | 'Add';
type EntityListProps<T> = IEntity<T> &
  EntityDataTableProps<T> & {
    EditComponent?: React.ElementType;
    defaultEntity?: T;
    actions: IActions<T>;
    onAddButtonClicked?: (event?: any) => void;
    openEditInNewPage?: boolean;
    refreshListAfterEdit?: boolean;
  };

const EntityList = (props: EntityListProps<any>) => {
  const history = useHistory();
  const location = useLocation();

  const dataTable = useRef<EntityDataTableRef>(null);

  const [state, setState] = useState({
    openEditModal: false,
    selectedEntity: undefined,
    mode: 'Edit',
  });
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const go = (path: string) => {
    // props.history.replace(location.pathname, { isBack: true });
    history.push(location.pathname + path);
  };

  const handleGoEditModal = (mode: ModalModeType, data: any, e?: any) => {
    const {
      actions: { selectEntity },
      onAddButtonClicked,
    } = props;
    selectEntity(data);
    if (mode === 'Add') {
      if (onAddButtonClicked) {
        onAddButtonClicked(e);
      } else {
        go(`/add`);
      }
    } else go(`/${data[props.keyField]}/edit`);
  };

  const handleGoViewDetail = (data: any, e?: any) => {
    const {
      keyField,
      actions: { selectEntity },
    } = props;
    //console.log('data', data)
    selectEntity(data);
    go(`/${data[keyField]}`);
  };

  const handleOpenEntityModal = (modalMode: ModalModeType, { data }: any, e?: any) => {
    const { openEditInNewPage } = props;

    if (openEditInNewPage) {
      handleGoEditModal(modalMode, data);
    } else {
      //console.log("modalMode :", modalMode, data);
      setState({
        openEditModal: true,
        mode: modalMode,
        selectedEntity: data,
      });
    }
  };

  const handleCloseEntityModal = (entity: any, isSave: boolean) => {
    const { refreshListAfterEdit } = props;

    if (isSave && refreshListAfterEdit && dataTable && dataTable.current) {
      dataTable.current.search({});
    }
    setState({ openEditModal: false, mode: 'Add', selectedEntity: undefined });
  };

  const contentButtons = (buttons: any) => {
    return <ToolbarButtons buttons={buttons} {...props} />;
  };

  const getActionHandler = (actionName: string) => {
    switch (actionName) {
      case 'edit':
        return (row: any, index: number, e: any) =>
          handleOpenEntityModal('Edit', { ...row, index }, e);
      case 'view':
        return (row: any, index: number, e: any) => handleGoViewDetail({ ...row, index }, e);
      default:
    }
    return undefined;
  };
  const defaultButtonsProps = {
    headerButtons: {
      download: true,
      print: true,
      pdf: false,
      viewColumn: true,
      add: true,
      search: true,
      filter: false,
      refresh: true,
    },
    selectionButtons: {
      download: true,
      print: true,
      pdf: false,
      delete: true,
    },
    rowButtons: {
      edit: {
        onClick: (e: MouseEvent, data: any) => handleOpenEntityModal('Edit', { data }),
      },
      view: {
        onClick: handleGoViewDetail,
      },
    },
    contentButtons: {
      add: {
        onClick: (e: MouseEvent) => handleOpenEntityModal('Add', { data: props.defaultEntity }),
        //label: props => `Add ${props.nameSingularText}`,
        icon: <Add />,
        className: 'btn-third mb',
        disabled: false,
      },
    },
  } as Buttons;

  const { flags, title, EditComponent, rowOptions, ...rest } = props;
  const { loading } = flags;

  const dataTableTitle = title || props.namePluralText;
  const buttonsProps = mergeButtonSections(props.buttonsOptions, defaultButtonsProps);

  const contentWrapperButtons = mergeButtons(
    buttonsProps.contentButtons,
    defaultButtonsProps.contentButtons,
  );

  for (const key in contentWrapperButtons) {
    if (contentWrapperButtons[key]) {
      const button = contentWrapperButtons[key];
      button.disabled = loading;
    }
  }

  if (rowOptions) {
    if (rowOptions.onRowDoubleClick && typeof rowOptions.onRowDoubleClick === 'string') {
      let handleType = rowOptions.onRowDoubleClick;
      rowOptions.onRowDoubleClick = getActionHandler(handleType);
    } else if (rowOptions.onRowClick && typeof rowOptions.onRowClick === 'string') {
      let handleType = rowOptions.onRowClick;
      rowOptions.onRowClick = getActionHandler(handleType);
    }
  }

  return (
    <ContentWrapper
      title={title}
      actionComponent={contentButtons(contentWrapperButtons)}
      showHeader={false}
    >
      <DataTable
        {...rest}
        rowOptions={rowOptions}
        title={dataTableTitle}
        flags={flags}
        ref={dataTable}
        buttonsOptions={buttonsProps}
      />
      <iframe
        title="ifm_contents_to_print"
        id="ifm_contents_to_print"
        style={{
          height: '0px',
          width: '0px',
          position: 'absolute',
          visibility: 'hidden',
        }}
      />
      {EditComponent && state.openEditModal ? (
        <EditComponent
          {...props}
          open={state.openEditModal}
          entity={state.selectedEntity}
          onClose={handleCloseEntityModal}
          mode={state.mode}
        />
      ) : null}
    </ContentWrapper>
  );
};

export default EntityList;
