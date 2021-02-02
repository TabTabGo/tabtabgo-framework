/* eslint-disable no-console */
import React, { useState, useEffect, useRef, ChangeEvent, ReactNode } from 'react';

import {
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import update from 'immutability-helper';

import AutoComplete from '../../Select/AutoComplete';
import _ from 'lodash';
import {
  FilterProps,
  SearchProperty,
  FilterProperty,
  OptionsFunc,
} from 'ttg-react/core/types/DataTable';
import {
  Predicate,
  QueryOperator,
  PredicateType,
  LogicalOperator,
} from 'ttg-react/core/types/Predicate';

const useFilterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginLeft: -1 * theme.spacing(1),
      marginRight: -1 * theme.spacing(1),
      flex: 'auto',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    select: {
      //marginTop:"0px",
      minWidth: '120px',
    },
    margin: {},
    textField: {
      marginLeft: 0,
      minWidth: 300,
    },
    searchIcon: {
      marginTop: theme.spacing(2),
    },
    autoComplete: {
      minWidth: '200px',
      //marginTop: "1.5em",
      margin: '0.5em',
    },
  }),
);

const Filter = (props: FilterProps<any>) => {
  const defaultSearch = props.defaultSearchOption
    ? props.defaultSearchOption
    : props.searchProperties.length > 0
    ? props.searchProperties[0]
    : ({} as SearchProperty);

  const [activeSearch, setActiveSearch] = useState<SearchProperty>(defaultSearch);
  const [, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const searchControlRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (props.defaultSearchOption) setActiveSearch(props.defaultSearchOption);
  }, [props.defaultSearchOption]);

  const handleOnSelectSearchType = (e: ChangeEvent<any>, child: ReactNode) => {
    const { searchProperties } = props;
    var searchOpt = searchProperties.find((sk) => sk.key === e.currentTarget.value);
    if (searchOpt) setActiveSearch(searchOpt);

    if (searchControlRef && searchControlRef.current) {
      searchControlRef.current.focus();
    }
  };

  const handleChangeSearchValue = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  // const handleChangeFilterValue = (e: React.FormEvent<HTMLInputElement>) => {
  //   setSearchValue(e.currentTarget.value);
  // };

  const handleSearch = () => {
    const { search, predicates } = props;
    if (search) {
      let samePredicateIndex =
        predicates && predicates.length > 0
          ? predicates.findIndex(
              (f) => f.field.key === activeSearch.key && f.type === PredicateType.Search,
            )
          : null;

      if (samePredicateIndex && samePredicateIndex > -1) {
        const updatedPredicates = update<Array<Predicate>>(predicates || new Array<Predicate>(), {
          [samePredicateIndex]: { value: { $set: searchValue } },
        });

        search(updatedPredicates);
      } else {
        let newPredicate = {
          type: PredicateType.Search,
          operator: activeSearch.defaultOperator
            ? activeSearch.defaultOperator
            : QueryOperator.Equal,
          value: searchValue,
          index: predicates ? predicates.length : 0,
        } as Predicate;

        const newPredicates = predicates ? predicates.concat(newPredicate) : [newPredicate];
        search(newPredicates);
      }

      setSearchValue('');
    } else {
      console.error('Search function not implemented');
    }
  };

  const handleChangeFilter = (filterKey: string, e: any) => {
    const { filters, search, predicates } = props;
    if (search) {
      let filter = filters && filters.length > 0 ? filters.find((f) => f.key === filterKey) : null;
      let samePredicates =
        filter && predicates && predicates.length > 0
          ? predicates.filter((f) => f.field.key === filterKey)
          : null;

      let newPredicate = {
        type: PredicateType.Filter,
        operator: filter && filter.defaultOperator ? filter.defaultOperator : QueryOperator.Equal,
        value: { value: e.value, displayValue: e.label },
        index: predicates ? predicates.length : 0,
      } as Predicate;

      if (samePredicates && samePredicates.length > 0) {
        newPredicate.logicalOperator = LogicalOperator.Or;
      }

      const newPredicates = predicates ? predicates.concat(newPredicate) : [newPredicate];

      search(newPredicates);
      setFilterValue('');
    } else {
      console.error('Search function not implemented');
    }
  };

  const defaultSearchTextBox = (props: any) => {
    const { classes } = props;
    return (
      <TextField {...props} className={classNames(classes.margin, classes.textField)} type="text" />
    );
  };

  const classes = useFilterStyles(props);

  const { searchProperties, filters, predicates } = props;

  //console.log('activeSearch :', activeSearch);
  let searchControl =
    activeSearch && activeSearch.component ? activeSearch.component : defaultSearchTextBox;

  let selectedFilterGroup = predicates
    ? _.groupBy(predicates, (f: Predicate) => f.field.key)
    : null;
  return (
    <Toolbar>
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="search-types-label">Search By</InputLabel>
          <Select
            className={classes.select}
            value={activeSearch.key}
            inputProps={{
              name: 'searchTypes',
              id: 'search-types-label',
            }}
            onChange={handleOnSelectSearchType}
          >
            {searchProperties.map((sk: SearchProperty) => {
              return (
                <MenuItem
                  key={sk.key}
                  value={sk.key}
                  //active={(activeSearch.key === sk.key).toString()}
                >
                  {sk.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          {searchControl({
            id: 'searchInputComponent',
            inputRef: searchControlRef,
            label: 'Search',
            value: searchValue,
            onChange: handleChangeSearchValue,
            onKeyPress: (e: KeyboardEvent) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            },
            classes: classes,
          })}
        </FormControl>
        <IconButton aria-label="Search" className={classes.searchIcon} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>

        {filters &&
          filters.map((filter: FilterProperty, key: number): any => {
            if (filter.component) {
              return filter.component(filter);
            }
            let filterProps: { options?: Array<any>; loadOptions?: OptionsFunc } = {};
            if (filter.options && typeof filter.options === 'function') {
              filterProps.loadOptions = filter.options as OptionsFunc;
            } else if (filter.options) {
              filterProps.options = filter.options as Array<any>;
            }

            return (
              <AutoComplete
                className={classes.autoComplete}
                key={key}
                value={selectedFilterGroup ? selectedFilterGroup[filter.key] : null}
                //value={this.state.filtersValue[filter.key]}
                placeholder={filter.label}
                onChange={handleChangeFilter.bind(filter.key)}
                {...filterProps}
              />
            );
          })}
      </div>
    </Toolbar>
  );
};

export default Filter;
