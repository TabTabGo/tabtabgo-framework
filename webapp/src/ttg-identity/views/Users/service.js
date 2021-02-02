import EntityService from '@tabtabgo/core/Entity/Service';
import { getPersonName } from 'ttg-identity/pages/ResetPassword/node_modules/@tabtabgo/core/utilities';

export default class UsersService extends EntityService {
  constructor() {
    super('users', 'user', getPersonName, 'id');
  }

  populateEntityBeforeSend(entity) {
    var modifiedEntity = Object.assign({}, entity);
    //Update entity object before send it to service
    return modifiedEntity;
  }

  getUserViews = async (searchValue, searchQuery, page = 0, top = 20) => {
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

  getUserOptions = (roles) => async (username, page = 0, top = 20) => {
    try {
      var searchQuery = null;
      if (username) {
        searchQuery = `(contains(Person/FirstName,'${username}') or contains(Person/LastName,'${username}'))`;
      }

      var searchParams = {
        $top: top,
        $skip: page * top,
      };
      if (searchQuery) {
        searchParams.$filter = searchQuery;
      }
      var searchUrl = '/views';
      if (roles) {
        searchUrl = `/role/${roles}`;
      }
      var result = await this.restApi.Get({
        url: searchUrl,
        parameters: searchParams,
      });

      if (result && result.items) {
        return result.items;
      }
      return [];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return [];
    }
  };
}
