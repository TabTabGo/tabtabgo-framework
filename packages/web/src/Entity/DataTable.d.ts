import React from 'react';
import { PagingList } from '@tabtabgo/core/types/PagingList';
import { Predicate, IActions, IEntity } from '@tabtabgo/core/types';
import { OrderDirection } from '@tabtabgo/core/types/enums';
import { Buttons, FilterProperty, SearchProperty, RowOptions, DataTableComponents, Column } from '@tabtabgo/core/types/DataTable';
/**
 * DataTable handle binding search , sorting and paging function with entity actions
 */
export declare type EntityDataTableRef = {
    search: (params: SearchParams) => void;
};
export declare type EntityDataTableProps<T> = IEntity<T> & {
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
export declare type SearchParams = {
    order?: OrderDirection;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    predicates?: Array<Predicate>;
};
declare const EntityDataTable: React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<EntityDataTableRef>>;
export default EntityDataTable;
