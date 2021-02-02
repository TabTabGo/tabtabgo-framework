import { apiCall } from '../utilities';
import { populatePageList } from 'ttg-identity/views/Users/node_modules/ttg-identity/pages/ResetPassword/node_modules/@tabtabgo/core/utilities';
export const getEducationStages = async (
  name,
  page = 0,
  size = 20,
  map = null,
  populateResult = null,
) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  var result = await apiCall('//EducationStages/Views', filter, page, size);
  return populateResult ? populateResult(result) : populatePageList(result, map);
};

export const getCities = (countryCode) => async (name, page = 0, size = 20, map) => {
  //todo support cache

  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  if (countryCode) {
    filter = filter === null ? '' : filter + ' and ';

    filter += `CountryCode eq '${countryCode}'`;
  }
  var result = await apiCall('//Cities/Views', filter, page, size);

  return populatePageList(result, map);
};

export const getPreferredCities = (countryCode) => async (name, page = 0, size = 20, map) => {
  //todo support cache

  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  if (countryCode) {
    filter = filter === null ? '' : filter + ' and ';

    filter += `CountryCode eq '${countryCode}'`;
  }
  var result = await apiCall('//Cities/Views', filter, page, size);
  result.items = [{ id: 999, display: 'All' }].concat(result.items);
  return populatePageList(result, map);
};

export const getAreas = (countryCode, cityId) => async (name, page = 0, size = 20, map) => {
  //todo support cache
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  if (countryCode) {
    filter = filter === null ? '' : filter + ' and ';
    filter += `CountryCode eq '${countryCode}'`;
  }
  if (cityId) {
    filter = filter === null ? '' : filter + ' and ';
    filter += `CityId eq ${cityId}`;
  }
  var result = await apiCall('//Areas/Views', filter, page, size);

  return populatePageList(result, map);
};

export const getIndustries = async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }

  filter = `${filter ? filter + ' and ' : ''}IndustryId gt 1`;
  var result = await apiCall('//Industries/Views', filter, page, size);

  result.items = [{ id: 1, display: 'All' }].concat(result.items);
  return populatePageList(result, map);
};

export const getInstitutions = (type, countryCode) => async (name, page = 0, size = 20, map) => {
  let filter = null;

  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  if (type) {
    filter = `${filter ? filter + ' and ' : ''}Type eq '${type}'`;
  }
  if (countryCode) {
    filter = `${filter ? filter + ' and ' : ''}CountryCode eq '${countryCode}'`;
  }
  filter = `${filter ? filter + ' and ' : ''}InstitutionId gt 9`;
  var result = await apiCall('//Institutions/Views', filter, page, size);
  let otherId = 1;
  if (type === 'university') {
    otherId = 2;
  }
  result.items = [{ id: otherId, display: 'Other' }].concat(result.items);

  return populatePageList(result, map);
};

export const getJobCategories = async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }

  filter = `${filter ? filter + ' and ' : ''}JobCategoryId gt 1`;
  var result = await apiCall('//JobCategories/Views', filter, page, size);
  result.items = [{ id: 1, display: 'All' }].concat(result.items);
  return populatePageList(result, map);
};

export const getPersonalities = (type) => async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  if (type) {
    filter = `${filter ? filter + ' and ' : ''}Type eq '${type}'`;
  }

  var result = await apiCall('//Personalities/Views', filter, page, size);

  return populatePageList(result, map);
};

export const getSkills = (type) => async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  if (type) {
    filter = `${filter ? filter + ' and ' : ''}Type eq '${type}'`;
  }
  filter = `${filter ? filter + ' and ' : ''}SkillId lt 999`;
  var result = await apiCall('//Skills/Views', filter, page, size);
  result.items = [{ id: 999, display: 'None' }].concat(result.items);
  return populatePageList(result, map);
};

export const getStudyFields = async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  var result = await apiCall('//StudyFields/Views', filter, page, size);

  return populatePageList(result, map);
};

export const getStudies = async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  var result = await apiCall('//Studies/Views', filter, page, size);

  return populatePageList(result, map);
};

export const getStudyMajors = async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  var result = await apiCall('//StudyMajors/Views', filter, page, size);
  return populatePageList(result, map);
};

export const getStudyPrograms = async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  var result = await apiCall('//StudyPrograms/Views', filter, page, size);
  return populatePageList(result, map);
};

export const getCertificates = async (name, page = 0, size = 20, map) => {
  let filter = null;
  if (name) {
    filter = `contains(Name,'${name}')`;
  }
  var result = await apiCall('//Certificates/Views', filter, page, size);

  return populatePageList(result, map);
};
/*
Code Name
VT	Visa Type
VS	Visa Sponsor
CL	Car License Type
OC	Own a Car
PS	Plan after high school
JT	Job Type
C	Compensation
S	Salary
OB	Other benefits
T	Transportation
DL	Driving License
ADPW	Amount of days per week
SWL	Student work length
RS	Reasons To Study
UY University Year
*/
export const getMasterdata = async (
  typeCode,
  name,
  page = 0,
  size = 20,
  map,
  orderBy,
  customFilter,
) => {
  let filter = `Type/Code eq '${typeCode}'`;
  if (name) {
    filter += `and contains(Name,'${name}')`;
  }
  if (customFilter) {
    filter += 'and ' + customFilter;
  }
  var result = await apiCall('//Masterdata/Views', filter, page, size, orderBy);

  return populatePageList(result, map);
};

export const getVisaTypes = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('VT', name, page, size, map, 'MasterdataId asc');
};

export const getVisaSponsors = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('VS', name, page, size, map, 'MasterdataId asc');
};

export const getCarLicenseTypes = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('CL', name, page, size, map, 'MasterdataId asc');
};

export const getOwnCars = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('OC', name, page, size, map, 'MasterdataId asc');
};

export const getPlansAfterHightSchool = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('PS', name, page, size, map);
};

export const getPreferredJobTypes = (customQuery) => async (name, page = 0, size = 20, map) => {
  //todo support cache
  var results = await getMasterdata(
    'JT',
    name,
    page,
    size,
    map,
    null,
    `${customQuery ? customQuery + ' and ' : ''}MasterdataId gt 50`,
  );
  return [{ id: 50, display: 'All' }].concat(results);
};

export const getJobTypes = (customQuery) => async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata(
    'JT',
    name,
    page,
    size,
    map,
    null,
    `${customQuery ? customQuery + ' and ' : ''}MasterdataId gt 50`,
  );
};

export const getCompensations = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('C', name, page, size, map);
};

export const getSalaries = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('S', name, page, size, map);
};

export const getOtherBenefits = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('OB', name, page, size, map);
};

export const getTransportation = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('T', name, page, size, map);
};

export const getDrivingLicenses = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('DL', name, page, size, map, 'MasterdataId asc');
};

export const getAmountOfDaysPerWeek = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('ADPW', name, page, size, map);
};

export const getStudentWorkLength = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('SWL', name, page, size, map);
};

export const getReasonsToWork = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('RS', name, page, size, map);
};

export const getUniversityYear = async (name, page = 0, size = 20, map) => {
  //todo support cache
  return getMasterdata('UY', name, page, size, map, 'MasterdataId asc');
};
