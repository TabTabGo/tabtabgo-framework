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
  update: string;
  delete: string;
  order: string;
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
const EntityActionTypes = (module = 'Items', subModule?: string): IEntityActionTypes => {
  let uppercaseModule = module.toUpperCase();
  if (subModule) {
    const ucSubModule = subModule.toUpperCase();
    uppercaseModule += '/' + ucSubModule;
  }

  return {
    search: `${uppercaseModule}/SEARCH`,
    searchUpdatePage: `${uppercaseModule}/SEARCH/CHANGE_PAGE`,
    preSearch: `${uppercaseModule}/SEARCH/PRE`,
    searching: `${uppercaseModule}/SEARCHING`,
    updateSearchResult: `${uppercaseModule}/SEARCH/CHANGE/RESULT`,
    load: `${uppercaseModule}/LOAD`,
    select: `${uppercaseModule}/SELECT`,
    unselect: `${uppercaseModule}/UNSELECT`,
    selectMultiple: `${uppercaseModule}/SELECT/MULTIPLE`,
    unselectMultiple: `${uppercaseModule}/UNSELECT/MULTIPLE`,
    selectAll: `${uppercaseModule}/SELECT/ALL`,
    resetSelected: `${uppercaseModule}/SELECT/RESET`,
    update: `${uppercaseModule}/UPDATE`,
    add: `${uppercaseModule}/CREATE`,
    save: `${uppercaseModule}/SAVE`,
    delete: `${uppercaseModule}/DELETE`,
    order: `${uppercaseModule}/SEARCH/ORDER`,
    activation: `${uppercaseModule}/POST/ACTIVATE/ENTITIES`,
    printing: `${uppercaseModule}/PRINTING`,
    exporting: `${uppercaseModule}/POST/EXPORTING`,
    print: `${uppercaseModule}/POST/PRINTED`,
    exportingPDF: `${uppercaseModule}/POST/EXPORTING/PDF`,
    exportingExcel: `${uppercaseModule}/POST/EXPORTING/EXCEL`,
    exportingCsv: `${uppercaseModule}/POST/EXPORTING/CSV`,
    printSelected: `${uppercaseModule}/POST/PRINT/SELECTED`,
    flag: (action: string) =>
      action ? `${uppercaseModule}/FLAG/${action.toUpperCase()}` : `${uppercaseModule}/FLAG/UPDATE`,
    error: (action: string) =>
      action ? `${uppercaseModule}/ERROR/${action.toUpperCase()}` : `${uppercaseModule}/FLAG/ERROR`,
    updateProperty: `${uppercaseModule}/UPDATE/PROPERTY`,
    resetData: `${uppercaseModule}/RESET`,
  } as IEntityActionTypes;
};

export default EntityActionTypes;
