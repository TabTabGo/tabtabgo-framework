import { Predicate, BasicComponent } from '..';
import { StandardProps } from '@material-ui/core';

export interface SelectedFilterProps<T>
  extends StandardProps<BasicComponent, SelectedFilterClassKeys> {
  predicates: Array<Predicate>;
  search(predicates: Array<Predicate>): void;
  theme: any;
  classes: any;
}

export type SelectedFilterClassKeys = 'root' | 'chip';
