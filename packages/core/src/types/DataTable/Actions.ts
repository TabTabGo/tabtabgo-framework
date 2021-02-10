import { Predicate, ActionOptions } from '..';

export interface Actions {
  onDelete?(items: any[], options?: ActionOptions): void;
  onExport?(type: string, items: any[], controlOptions?: any, options?: any): void;
  onPrint?(items: any[], controlOptions?: any, options?: any): void;
  onEdit?(item: any): void;
  onAdd?(item: any): void;
  onRefresh?(predicates?: Predicate[]): void;
}
