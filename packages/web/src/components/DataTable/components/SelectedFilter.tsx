import React from 'react';
import { Chip, Tooltip, Theme, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { SelectedFilterProps } from '@tabtabgo/core/types/DataTable';
import { Predicate, PredicateType } from '@tabtabgo/core/types/Predicate';
import update from 'immutability-helper';

//TODO how currently override styles
const useSelectedFilterStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    chip: {
      margin: `${theme.spacing(1)}px ${theme.spacing(1)}px 0px 0px`,
    },
  };
});

const SelectedFilter = (props: SelectedFilterProps<any>) => {
  const defaultClasses = useSelectedFilterStyles(props);
  const { classes, search, predicates } = props;

  const handleRemoveSearch = (e: any) => {
    const searchPredicateIndex = predicates
      ? predicates.findIndex((p:any) => p.type === PredicateType.Search)
      : -1;
    if (searchPredicateIndex > -1) {
      let newPredicates = update(predicates, { $splice: [[searchPredicateIndex, 1]] });
      search(newPredicates);
    }
  };

  const handleRemoveFilter = (e: any, index: number) => {
    if (index > -1) {
      let newPredicates = update(predicates, { $splice: [[index, 1]] });
      search(newPredicates);
    }
  };

  const searchPredicate = predicates
    ? predicates.find((p) => p.type === PredicateType.Search)
    : ({} as Predicate);

  const filters = predicates ? predicates.filter((p : any) => p.type === PredicateType.Filter) : [];
  return (
    <div className={classNames(defaultClasses.root, classes && classes.root ? classes.root : {})}>
      {searchPredicate && searchPredicate.value && (
        <Chip
          label={
            <Typography variant="body2">
              <strong>
                {searchPredicate.field.label
                  ? searchPredicate.field.label
                  : searchPredicate.field.key}
              </strong>{' '}
              {searchPredicate.value}
            </Typography>
          }
          onDelete={(e: any) => handleRemoveSearch(e)}
          className={classNames(defaultClasses.chip, classes && classes.chip ? classes.chip : {})}
        />
      )}
      {filters
        ? filters
            .sort((a: Predicate, b: Predicate) => (a.field.key === b.field.key ? 1 : 0))
            .map((item: Predicate, index: number) => (
              <Tooltip key={index} title={item.field.label ? item.field.label : item.field.key}>
                <Chip
                  label={
                    <Typography variant="body2">
                      <strong>{item.field.label}</strong>{' '}
                      {item.value.displayValue || item.value.value}
                    </Typography>
                  }
                  key={index}
                  onDelete={(e: any) => handleRemoveFilter(e, index)}
                  className={classNames(
                    defaultClasses.chip,
                    classes && classes.chip ? classes.chip : {},
                  )}
                />
              </Tooltip>
            ))
        : null}
    </div>
  );
};

export default SelectedFilter;
