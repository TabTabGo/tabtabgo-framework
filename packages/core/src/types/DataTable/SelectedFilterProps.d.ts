import { Predicate, BasicComponent } from '..';

export interface SelectedFilterProps<T>
  extends React.ReactElement<BasicComponent, SelectedFilterClassKeys> {
  predicates: Array<Predicate>;
  search(predicates: Array<Predicate>): void;
  theme: any;
  classes: any;
}

export type SelectedFilterClassKeys = 'root' | 'chip';
