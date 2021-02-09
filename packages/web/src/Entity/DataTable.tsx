/* eslint-disable no-console */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import qs from 'qs';
import _ from 'lodash';
import DataTable from '../components/DataTable';

import { currentServiceProvider } from '@tabtabgo/core/providers/ServiceProvider';

import { mergeButtonSections } from '../components/Buttons';
import { PagingList } from '@tabtabgo/core/types/PagingList';
import { Predicate, PredicateType, IActions, IEntity, ActionOptions } from '@tabtabgo/core/types';
import { OrderDirection } from '@tabtabgo/core/types/enums';
import {
  Actions,
  Buttons,
  FilterProperty,
  SearchProperty,
  RowOptions,
  DataTableComponents,
  Column,
  SelectionMode,
} from '@tabtabgo/core/types/DataTable';

/**
 * DataTable handle binding search , sorting and paging function with entity actions
 */
export type EntityDataTableRef = {
  search: (params: SearchParams) => void;
};

export type EntityDataTableProps<T> = IEntity<T> & {
  components?: DataTableComponents<T>;
  title: string;
  styles?: React.CSSProperties;
  columns: Array<Column<any>>;
  enableSelection?: boolean;
  rowOptions?: RowOptions<T>;
  buttonsOptions?: Buttons;

  searchOptions?: {
    searchUrl?: string;
    order?: OrderDirection;
    orderBy?: string;
    expand?: string;
    fixCriteria?: Array<Predicate>;
  };
  filters?: Array<FilterProperty>;
  searchProperties: Array<SearchProperty>;
  defaultSearchOption?: SearchProperty;
  tableOptions?: any;
  // // reducer props
  searchResult: PagingList<T>;
  flags: any;
  exportsService?: any;
  exportOptions?: {
    columns: Array<any>;
    fileName: string;
    pageTitle: string;
    namePlural: string;
  };
  defaultEntity: T;
  disableAutoLoad?: boolean;
  forceReload: boolean;
  useQueryString?: boolean;
  actions: IActions<T>;
  serializeSearchParams?: (searchParams: SearchParams) => string;
  deserializeSearchParams?: (queryString: string) => SearchParams;
};

export type SearchParams = {
  order?: OrderDirection;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  predicates?: Array<Predicate>;
};

const EntityDataTable = forwardRef<EntityDataTableRef, EntityDataTableProps<any>>(
  (
    {
      namePlural,
      nameSingular,
      namePluralText,
      nameSingularText,
      //defaultEntity,
      buttonsOptions,
      exportsService,
      columns,
      keyField,
      displayField,
      searchResult,
      flags,
      tableOptions,
      rowOptions,
      actions,
      filters,
      searchOptions,
      searchProperties,
      defaultSearchOption,
      enableSelection,
      disableAutoLoad,
      forceReload,
      title,
      useQueryString,
      serializeSearchParams,
      deserializeSearchParams,
      defaultEntity,
      ...rest
    }: EntityDataTableProps<any>,
    ref,
  ) => {
    const history = useHistory();
    const location = useLocation();
    const defaultExportService = currentServiceProvider.newExportService({
      namePlural: namePlural,
      pageTitle: 'List of ' + namePlural,
    });

    //const [buttonsUpdated, setButtonsUpdated] = useState(false);
    const [buttons, setButtons] = useState<Buttons>({
      headerButtons: {
        download: true,
        print: true,
        pdf: false,
        columnsView: true,
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
        edit: true,
        view: true,
      },
    });

    useEffect(() => {
      if (!_.isEmpty(buttonsOptions) && buttons) {
        setButtons(mergeButtonSections(buttonsOptions, buttons));
        //setButtonsUpdated(true);
      }
    }, [buttonsOptions]);

    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
      if (useQueryString) {
        internalSearch(parseQueryString(location.search));
      }
    }, [location]);

    useEffect(() => {
      var resetSearch = true;
      if (history.action === 'POP') {
        resetSearch = false;
      }
      //console.log("DataTable mounted for", this.props.namePlural);
      if ((validateToLoadData() && !disableAutoLoad) || forceReload) {
        // console.log(`Load ${this.state.namePluralText}`);
        search(resetSearch ? { page: 0, predicates: [] } : {});
      }
      //TODO find the correct way to forward refs
      // if (refs) {
      //   refs();
      // }
    }, []);

    useImperativeHandle(ref, () => {
      return {
        search: (params: SearchParams) => search(params),
      };
    });

    const parseQueryString = (queryString: string): SearchParams => {
      const searchParams = deserializeSearchParams
        ? deserializeSearchParams(queryString)
        : qs.parse(queryString, {
            allowDots: true,
            ignoreQueryPrefix: true,
          });

      //using qs library will convert querystring to object instead of array
      if (searchParams.predicates && !Array.isArray(searchParams.predicates)) {
        let predicates = [{} as any];
        Object.keys(searchParams.predicates).forEach((p) => {
          var prop = searchParams.predicates[p];
          if (_.isArray(prop)) {
            prop.forEach((pValue, i) => {
              while (i >= predicates.length) {
                predicates.push({});
              }
              predicates[i][p] = pValue;
            });
          } else {
            predicates[0][p] = prop;
          }
        });

        predicates.forEach((p: Predicate) => {
          let field = searchProperties.find((f) => f.key === p.field.key);
          if (!field) {
            field = filters?.find((f) => f.key === p.field.key);
          }
          if (field) {
            p.field = field;
          }

          if (p.type) {
            p.type = p.type.toString() === '0' ? PredicateType.Search : PredicateType.Filter;
          }
        });
        searchParams.predicates = predicates;
      }

      return searchParams;
    };

    const stringifySearchParams = (searchParams: SearchParams): string => {
      var simplifyParams = { ...searchParams };
      if (simplifyParams.predicates) {
        simplifyParams.predicates = simplifyParams.predicates.map((p) => ({
          ...p,
          field: p.field,
        }));
      }
      return serializeSearchParams
        ? serializeSearchParams(simplifyParams)
        : qs.stringify(simplifyParams, {
            allowDots: true,
            arrayFormat: 'repeat',
          });
    };
    const getExportsService = () => (exportsService ? exportsService : defaultExportService);

    /// Avoid loading the same items every time component is Mount
    function validateToLoadData() {
      // if (this.props.searchResult) {
      //   let entities = this.props.searchResult.items ? this.props.searchResult.items : [];
      //   return entities.length === 0;
      // }
      //todo compare the query sent and the result page
      return true;
    }

    //#region Search and filter Handler
    const search = ({ page, pageSize, order, orderBy, predicates }: SearchParams) => {
      if (!searchOptions) searchOptions = {};
      if (page === undefined) page = searchResult.page;
      if (pageSize === undefined) pageSize = searchResult.pageSize;
      if (order === undefined) order = searchResult && (searchResult.order || searchOptions.order);
      if (orderBy === undefined)
        orderBy = searchResult && (searchResult.orderBy || searchOptions.orderBy);
      if (predicates === undefined) {
        predicates = searchResult && searchResult.query ? searchResult.query.predicates : [];
      }

      var searchParams = {
        page,
        pageSize,
        order,
        orderBy,
        predicates,
      };
      if (useQueryString) {
        const location = Object.assign({}, history.location, {
          search:
            // "?" +
            stringifySearchParams(searchParams),
        });
        history.push(location);
      } else {
        internalSearch(searchParams);
      }
    };

    const internalSearch = ({ page, pageSize, order, orderBy, predicates }: SearchParams) => {
      if (!searchOptions) searchOptions = {};
      const { searchUrl, expand, fixCriteria } = searchOptions;

      // console.group("Search Props :");
      // console.log("searchResult", searchResult);
      // console.log("page :", page);
      // console.log("pageSize :", pageSize);
      // console.log("order :", order);
      // console.log("orderBy :", orderBy);
      // console.log("predicates :", predicates);
      // console.log("searchUrl :", searchUrl);
      // console.log("expand :", expand);
      // console.log("fixCriteria :", fixCriteria);
      // console.groupEnd();
      if (actions.search) {
        actions.search(
          predicates || [],
          Number(page),
          Number(pageSize),
          order,
          orderBy,
          searchUrl,
          expand,
          fixCriteria,
        );
      }
    };
    //#region Event Handlers

    const handleSearch = (predicates: Array<Predicate>) => {
      search({
        predicates,
        page: 0,
      });
    };

    const handleOnDelete = (items: any[], options?: ActionOptions) => {
      actions.deleteEntities(items, options);
    };
    const handleOnExport = (type: string, items: any[], controlOptions?: any, options?: any) => {
      actions.exportEntities(type, items, controlOptions, options);
    };

    function handleOnPageChange(page: number, pageSize: number) {
      search({ page, pageSize });
    }

    function handleOnPageSizeChange(sizePerPage: number) {
      handleOnPageChange(0, sizePerPage);
    }

    const handleOnSortChange = (orderBy: string) => {
      let order = OrderDirection.Desc;

      if (searchResult.orderBy === orderBy && searchResult.order === OrderDirection.Desc) {
        order = OrderDirection.Asc;
      }

      search({ order, orderBy });
    };

    const { loading } = flags;

    const tableTitle = title || namePluralText;
    let dataTableOptions = {
      order: searchResult?.order || searchOptions?.order,
      orderBy: searchResult?.orderBy || searchOptions?.orderBy,
      onSort: handleOnSortChange,
      ...tableOptions,
    };
    //table pagingOptions
    let dataPagingOptions = {
      page: searchResult.page,
      totalRecords: searchResult.totalRecords,
      totalPages: searchResult.totalPages,
      pageSize: searchResult.pageSize,
      onPageChange: handleOnPageChange,
      onRowsPerPageChange: handleOnPageSizeChange,
    };

    //select row options
    let dataTableRowOptions = {
      mode: SelectionMode.Checkbox,
      className: 'info',
      ...rowOptions,
    };

    let tableActions = {
      onRefresh: handleSearch,
      onDelete: handleOnDelete,
      onExport: handleOnExport,
    } as Actions;

    const filterOptions = {
      defaultSearchOption,
      searchProperties,
      filters,
      search: handleSearch,
      predicates: searchResult.query.predicates,
    };
    return (
      <DataTable
        {...rest}
        title={tableTitle}
        nameSingular={nameSingular}
        namePlural={namePlural}
        nameSingularText={nameSingularText}
        namePluralText={namePluralText}
        keyField={keyField}
        displayField={displayField}
        columns={columns}
        items={searchResult.items}
        isLoading={loading}
        filterOptions={filterOptions}
        buttons={buttons}
        enableSelection={enableSelection}
        rowOptions={dataTableRowOptions}
        pagingOptions={dataPagingOptions}
        tableOptions={dataTableOptions}
        actions={tableActions}
        flags={flags}
        exportsService={getExportsService()}
      />
    );
  },
);

EntityDataTable.propTypes = {};

export default EntityDataTable;
