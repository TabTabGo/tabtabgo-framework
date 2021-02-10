import { currentServiceProvider } from '@tabtabgo/core/ServiceProvider';

const restApi = new currentServiceProvider.newAjaxService('', '', null, {
  disableTokenAuthorization: false,
});

export const apiCall = async (url, filter, page, size, orderBy) => {
  let parameters = {};
  if (filter) {
    parameters.$filter = filter;
  }
  if (page) {
    parameters.$skip = page * size;
  }
  if (size) {
    parameters.$top = size;
  }

  parameters.$orderBy = orderBy ? orderBy : 'Name asc';

  //todo support cache
  return restApi.Get({
    url: url,
    parameters: parameters,
  });
};

export const warpSelect = (getFunc) => async (search) => {
  return await getFunc(search, 0, 25, defaultMap);
};

export const warpSelectWithoutMap = (getFunc) => async (search) => {
  return await getFunc(search, 0, 25);
};

export const warpSelectPaging = (getFunc) => async (search, loadedOptions, { page }) => {
  var result = await getFunc(search, page, 20, defaultMap, (results) => results);
  return {
    options: result.items,
    hasMore: result.hasMore,
    additional: {
      page: page + 1,
    },
  };
};

export const defaultMap = (data) => {
  return { label: data.display, value: data.id, data };
};
