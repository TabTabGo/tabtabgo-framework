export interface CustomColumn<T> {
  field: string;
  value: (item: T) => string;
  header: string;
  order?: number;
}
