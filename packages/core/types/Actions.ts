import { OrderDirection } from './enums/OrderDirection';
import { Predicate } from './Predicate';
import { PagingList } from './PagingList';
import { ActionOptions } from './ActionOptions';
import { JsonPatch } from './JsonPatch';

export interface IActions<T> {
  getEntity: (id: any, onLoaded?: (entity: T) => void, expand?: string) => Promise<T | undefined>;
  search: (
    predicates: Array<Predicate>,
    page: number,
    pageSize: number,
    order?: OrderDirection,
    orderBy?: string,
    searchUrl?: string,
    expand?: string,
    fixCriteria?: Array<Predicate>,
  ) => Promise<PagingList<T>>;
  updatePage: (pageOption: number) => { type: string; pageOption: any };
  selectEntity: (selectedEntity: any) => any;
  loadEntity: (selectedEntity: T) => void;
  unselectEntity: () => { type: string };
  selectAllRows: (isSelected: boolean, rows?: Array<T>) => { type: string; entities?: Array<T> };
  resetSelectedEntities: () => { type: string };
  changeFlag: (
    action: string | { [key: string]: any },
    value: any,
    extraProps?: any,
  ) => {
    type: string;
    actionName: string;
    actionValue?: string;
    payload?: any;
    [key: string]: any;
  };
  changeProperty: (
    propName: string,
    value?: any,
  ) => { type: string; entity: { [key: string]: any } };
  modifyEntity: (changes: Partial<T>) => { type: string; entity: Partial<T> };
  saveEntity: (entity: T, options?: ActionOptions) => Promise<any>;
  updateEntity: (entity: T, options?: ActionOptions) => Promise<any>;
  createEntity: (entity: T, options?: ActionOptions) => Promise<any>;
  saveEntityChanges: (
    id: any,
    entity: T,
    changes: Array<JsonPatch>,
    original: T,
    options?: ActionOptions,
  ) => Promise<any>;
  deleteEntity: (entity: T, options?: ActionOptions) => Promise<any>;
  deleteEntities: (entities: Array<T>, options?: ActionOptions) => Promise<any>;
  entitiesActivation: (
    entities: Array<T>,
    status?: boolean,
    activationParameter?: string,
  ) => Promise<any>;
  exportEntities: (
    exportType: string,
    entities: Array<T>,
    status?: boolean,
    activationParameter?: string,
  ) => Promise<any>;
}
