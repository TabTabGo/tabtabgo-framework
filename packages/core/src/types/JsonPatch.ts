export type JsonPatchOperation = 'remove' | 'replace' | 'add';
export interface JsonPatch {
  op: JsonPatchOperation;
  path: string;
  value: any;
  from?: string;
}
