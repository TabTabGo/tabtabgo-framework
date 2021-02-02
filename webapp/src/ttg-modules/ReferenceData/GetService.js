import { apiCall } from '../utilities';
import { populatePageList } from '@tabtabgo/core/utilities';
export const yesNoList = [
  { value: false, label: 'No' },
  { value: true, label: 'Yes' },
];
export const GenderList = [
  { value: 'f', label: 'Female' },
  { value: 'm', label: 'Male' },
  { value: 'n', label: 'Prefer not to say' },
];

export const getGenderList = (includeAnonymous) => {
  if (includeAnonymous === true) {
    return GenderList;
  } else {
    return GenderList.filter((item) => item.value !== 'n');
  }
};

export const getGender = async (name) => {
  return new Promise((resolve) => {
    if (!name) {
      return resolve(GenderList);
    }
    var result = GenderList.filter((g) => g.label.includes(name));
    return resolve(result);
  });
};

export const getLanguages = async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  var result = await apiCall('//Languages/Views', filter, page, size);

  return populatePageList(result, map);
};

export const getCountries = async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  var result = await apiCall('//Countries/Views', filter, page, size);

  return populatePageList(result, map);
};

export const getStatuses = (applyTo) => async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  if (applyTo) {
    filter = filter === null ? '' : filter + ' and ';

    filter += `ApplyTo eq '${applyTo}'`;
  }

  var result = await apiCall('//Statuses/Views', filter, page, size, 'StatusId asc');

  return populatePageList(result, map);
};
