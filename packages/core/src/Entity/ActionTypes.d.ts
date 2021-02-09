export interface IEntityActionTypes {
    search: string;
    searchUpdatePage: string;
    preSearch: string;
    updateSearchResult: string;
    load: string;
    select: string;
    selectMultiple: string;
    unselectMultiple: string;
    selectAll: string;
    resetSelected: string;
    add: string;
    print: string;
    printSelected: string;
    resetData: string;
    flag: (action: string) => string;
    error: (action: string) => string;
    [key: string]: any;
}
/**
 *
 * @param {string} module {module name in plural}
 * @param {string} subModule {subModule}
 */
declare const EntityActionTypes: (module?: string, subModule?: string) => IEntityActionTypes;
export default EntityActionTypes;
