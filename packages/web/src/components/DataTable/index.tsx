/* eslint-disable no-console */
import React, { useState, useEffect, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Paper, Hidden, Theme, createStyles } from '@material-ui/core';

import update from 'immutability-helper';

import DefaultToolbar from './components/Toolbar';
import DefaultSelectionToolbar from './components/SelectionToolbar';
import DefaultFilter from './components/Filter';
import DefaultTable from './components/Table';
import DefaultSelectedFilter from './components/SelectedFilter';
import DefaultPaging from './components/Paging';
import { ToolbarButtons } from '../Buttons';

import { getToolbarButtons, getRowButtons, getSelectedRowButtons } from './Buttons';
import {
  DataTableProperties,
  Column,
  TableProps,
  FilterProps,
  ToolbarProps,
  SelectedFilterProps,
  SelectionToolbarProps,
  PagingProps,
  RowButtons,
} from 'ttg-react/core/types/DataTable';
import classNames from 'classnames';
import { Predicate } from 'ttg-react/core/types';

export const useDataTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    toolbarNoGutter: {
      paddingLeft: 0,
    },
    loadingProgressWrapper: {
      display: 'inline-block',
      marginRight: '24px',
      padding: theme.spacing(1),
      paddingTop: theme.spacing(2),
    },
    cardRoot: {},
    paddedContainer: {},
    progress: {},
  }),
);

export default function DataTable(props: DataTableProperties<any>) {
  const {
    enableSelection,
    components,
    items,
    keyField,
    isLoading,
    title,
    theme,
    buttons,
    tableOptions,
    rowOptions,
    pagingOptions,
    filterOptions,
    actions,
    namePlural,
    nameSingular,
    displayField,
    namePluralText,
    nameSingularText,
    ...rest
  } = props;

  const classes = useDataTableStyles(props);
  const [columns, setColumns] = useState<Array<Column<any>>>(props.columns);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState<Array<any>>(new Array<any>());
  const [predicates, setPredicates] = useState<Array<Predicate>>(
    props.filterOptions && props.filterOptions.predicates
      ? props.filterOptions.predicates
      : new Array<Predicate>(),
  );

  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  useEffect(() => {
    if (props.filterOptions && props.filterOptions.predicates)
      setPredicates(props.filterOptions.predicates);
  }, [props.filterOptions]);

  useEffect(() => {
    if (props?.rowOptions?.onRowSelectionChange) {
      props.rowOptions.onRowSelectionChange(selectedItems);
    }
  }, [selectedItems]);

  //#region List Handler and functions
  const handleSelect = (checked: boolean, row: any, index: number, event: any) => {
    event.stopPropagation();
    if (checked) {
      setSelectedItems(selectedItems.concat([row]));
    } else if (selectedItems && selectedItems.length > 0) {
      let itemIndex = selectedItems.findIndex((item) => item[keyField] === row[keyField]);
      if (itemIndex >= 0) {
        setSelectedItems(update(selectedItems, { $splice: [[itemIndex, 1]] }));
      }
    }
  };

  const handleOnSelectAll = (isSelected: boolean, items: Array<any>) => {
    if (items) {
      var newSelectedItems = [...selectedItems];
      items.forEach((item: any) => {
        var isExistIndex = newSelectedItems.findIndex((si) => si[keyField] === item[keyField]);
        if (isExistIndex > -1) {
          if (!isSelected) newSelectedItems.splice(isExistIndex, 1);
        } else if (isSelected) {
          newSelectedItems.push(item);
        }

        //if (newSelectedItems.length === 0) return;
      });
      setSelectedItems(newSelectedItems);
    }
  };

  const handleChangeColumnProperties = (columnName: string, property: string, value: any) => {
    var columnIndex = columns.findIndex((c) => c.name === columnName);
    let newColumns = update(columns, {
      [columnIndex]: {
        [property]: { $set: value },
      },
    });
    if (columnIndex >= 0) {
      setColumns(newColumns);
    }
  };

  const handleSearch = (predicates: Array<Predicate>) => {
    setPredicates(predicates);
    if (filterOptions && filterOptions.search) {
      filterOptions.search(predicates);
    } else {
      console.error('Search function not implemented');
    }
  };

  const handleOpenEntityModal = (item: any) => {
    setOpenEditModal(true);
    setEditableItem(item);
  };

  const handleCloseEntityModal = () => {
    setOpenEditModal(false);
    setEditableItem(null);
  };

  const isSelected = (key: any) => {
    if (selectedItems && key) return selectedItems.findIndex((e) => e[keyField] === key) !== -1;
    return false;
  };

  //#endregion
  const entityProps = {
    keyField,
    namePlural,
    nameSingular,
    displayField,
    namePluralText,
    nameSingularText,
  };
  const isSelectionEnabled = enableSelection === undefined ? true : enableSelection;
  const { cardRoot, paddedContainer } = classes;
  const rowButtons = getRowButtons(buttons ? buttons.rowButtons : null);
  const currentRowOptions = rowOptions ? rowOptions : {};
  //TODO how to handle custom onSelect action
  currentRowOptions.onSelect = handleSelect;

  const viewTable =
    components && typeof components.table === 'boolean' ? (components.table as boolean) : true;
  const viewFilter =
    components && typeof components.filter === 'boolean' ? (components.filter as boolean) : true;
  const viewSelectedFilter =
    components && typeof components.selectedFilter === 'boolean'
      ? (components.selectedFilter as boolean)
      : true;
  const viewToolbar =
    components && typeof components.toolbar === 'boolean' ? (components.toolbar as boolean) : true;
  const viewSelectionToolbar =
    components && typeof components.selectionToolbar === 'boolean'
      ? (components.selectionToolbar as boolean)
      : true;

  const viewPaging =
    components && components.paging && typeof components.paging === 'boolean'
      ? (components.paging as boolean)
      : true;

  const CustomTable =
    components && components.table
      ? (components.table as FunctionComponent<TableProps<any>>)
      : DefaultTable;

  const CustomFilter =
    components && components.filter
      ? (components.filter as FunctionComponent<FilterProps<any>>)
      : DefaultFilter;

  const CustomSelectedFilter =
    components && components.table
      ? (components.selectedFilter as FunctionComponent<SelectedFilterProps<any>>)
      : DefaultSelectedFilter;

  const CustomToolbar =
    components && components.toolbar
      ? (components.toolbar as FunctionComponent<ToolbarProps<any>>)
      : DefaultToolbar;

  const CustomSelectionToolbar =
    components && components.selectionToolbar
      ? (components.selectionToolbar as FunctionComponent<SelectionToolbarProps<any>>)
      : DefaultSelectionToolbar;

  const CustomPaging =
    components && components.paging
      ? (components.paging as FunctionComponent<PagingProps>)
      : DefaultPaging;

  //console.log("components :", components);
  //console.log("viewSelectedFilter :", viewSelectedFilter);
  //console.log("index columns :", columns, props.columns);
  //TODO should remove it?
  const EditComponent = components ? components.edit : undefined;
  const MobileComponent = components ? components.mobile : undefined;

  const rootClassNames = classNames({
    [cardRoot]: true,
    [paddedContainer]: true,
  });
  const desktopComponent = (
    <React.Fragment>
      {/** View Selected Items Filter */}
      {selectedItems && selectedItems.length > 0 ? (
        viewSelectionToolbar ? (
          <CustomSelectionToolbar
            {...rest}
            {...entityProps}
            columns={columns}
            selectedItems={selectedItems}
            buttons={getSelectedRowButtons(buttons ? buttons.selectionButtons : null)}
            actions={{
              ...actions,
              onAdd: handleOpenEntityModal.bind(false),
              onRefresh: filterOptions?.search,
            }}
          />
        ) : null
      ) : viewToolbar ? (
        <CustomToolbar
          {...rest}
          {...entityProps}
          theme={theme}
          columns={columns}
          buttons={getToolbarButtons(buttons ? buttons.headerButtons : null)}
          title={title ? title : namePluralText}
          changeColumnProperties={handleChangeColumnProperties}
          actions={{
            ...actions,
            onAdd: handleOpenEntityModal.bind(false),
            onRefresh: filterOptions?.search,
          }}
        />
      ) : null}
      {/** View Filter */}
      {viewFilter && filterOptions ? (
        <CustomFilter {...filterOptions} {...entityProps} {...rest} search={handleSearch} />
      ) : null}
      {/** View Selected Filters */}
      {viewSelectedFilter ? (
        <CustomSelectedFilter
          predicates={predicates}
          search={handleSearch}
          theme={theme}
          classes={{ root: '', chip: '' }}
        />
      ) : null}
      {/*** View tables */}
      {viewTable ? (
        <CustomTable
          isLoading={isLoading || false}
          enableSelection={isSelectionEnabled}
          rowButtons={
            buttons && buttons.rowButtons
              ? (buttons.rowButtons as RowButtons)
              : { edit: false, view: false }
          }
          columns={columns}
          pagingOptions={pagingOptions}
          items={items || []}
          selectedItems={selectedItems}
          isSelected={currentRowOptions?.checkIsSelected ?? isSelected}
          onSelectAll={handleOnSelectAll}
          rowOptions={currentRowOptions}
          components={{
            row: components?.row,
            header: components?.header,
          }}
          {...entityProps}
          {...tableOptions}
        />
      ) : null}
    </React.Fragment>
  );
  let finalComponent = desktopComponent;
  if (MobileComponent) {
    finalComponent = (
      <React.Fragment>
        <Hidden mdUp>
          {isLoading ? (
            <div className={classes.loadingProgressWrapper}>
              <CircularProgress size={24} className={classes.progress} />
            </div>
          ) : items ? (
            items.map((row: any, rIndex: number) => {
              const isSelectedValue = isSelected(row[keyField]);
              /**isSelectionEnabled */
              return (
                <Paper elevation={0} className={rootClassNames} key={rIndex}>
                  <MobileComponent
                    enableSelection={isSelectionEnabled}
                    isSelected={isSelectedValue}
                    onClick={(e: any) => {
                      if (rowOptions?.onClick) rowOptions?.onClick(row, rIndex, e);
                    }}
                    onDoubleClick={(e: any) => {
                      if (rowOptions?.onDoubleClick) rowOptions?.onDoubleClick(row, rIndex, e);
                    }}
                    columns={columns}
                    padding={tableOptions?.padding}
                    index={rIndex}
                    rowButtons={rowButtons}
                    rowData={row}
                    style={{ width: '100%' }}
                  />
                  <Grid container justify="flex-end">
                    {rowButtons ? (
                      <ToolbarButtons
                        {...rest}
                        defaultColor="primary"
                        data={row}
                        buttons={rowButtons}
                      />
                    ) : null}
                  </Grid>
                </Paper>
              );
            })
          ) : null}
        </Hidden>
        <Hidden smDown>{desktopComponent}</Hidden>
      </React.Fragment>
    );
  }
  return (
    <div style={{ width: '100%' }}>
      {finalComponent}
      {viewPaging && !isLoading ? <CustomPaging {...pagingOptions} /> : null}

      {EditComponent && (
        <EditComponent
          {...props}
          open={openEditModal}
          entity={editableItem}
          onClose={handleCloseEntityModal}
          buttons={buttons ? buttons.editButtons : null}
        />
      )}
    </div>
  );
}

//export default withStyles(styles)(DataTable);
