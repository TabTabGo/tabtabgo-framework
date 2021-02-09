import React from 'react';
import { EntityDataTableProps } from './DataTable';
import { IActions, IEntity } from '@tabtabgo/core/types';
export declare type ModalModeType = 'Edit' | 'Add';
declare type EntityListProps<T> = IEntity<T> & EntityDataTableProps<T> & {
    EditComponent?: React.ElementType;
    defaultEntity?: T;
    actions: IActions<T>;
    onAddButtonClicked?: (event?: any) => void;
    openEditInNewPage?: boolean;
    refreshListAfterEdit?: boolean;
    ContentWrapper: React.ReactElement<any>;
};
declare const EntityList: (props: EntityListProps<any>) => JSX.Element;
export default EntityList;
