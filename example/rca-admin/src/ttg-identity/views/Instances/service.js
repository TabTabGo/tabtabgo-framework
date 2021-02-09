import EntityService from '@tabtabgo/core/Entity/Service';

export default class InstancesService extends EntityService {
  constructor() {
    super('instances', 'instance', 'name', 'instanceId');
  }
  populateEntityBeforeSend(entity) {
    var modifiedEntity = Object.assign({}, entity);
    //Update entity object before send it to service
    return modifiedEntity;
  }

  getInstanceViews = async (searchValue, searchQuery, page = 0, top = 20) => {
    var searchParams = {
      $top: top,
      $skip: page * top,
    };
    if (searchValue) {
      searchParams.$filter = this.queryService.getODataFilter({
        value: searchValue,
        ...searchQuery,
      });
    }
    var result = await this.restApi.Get({
      url: '/views',
      parameters: searchParams,
    });
    if (result && result.items && result.items.length > 0) {
      return result;
    }
    return { page: 1, items: [] };
  };
}
