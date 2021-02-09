import { DataPaging } from './DataPaging';
import { OrderDirection } from './enums/OrderDirection';
import { Predicate } from './Predicate';
export interface PagingList<T> extends DataPaging {
    numberOfElements: number;
    query: {
        predicates?: Array<Predicate>;
        searchUrl?: string;
        params?: {
            [key: string]: string;
        };
    };
    items: Array<T>;
    order?: OrderDirection;
    orderBy?: string;
}
