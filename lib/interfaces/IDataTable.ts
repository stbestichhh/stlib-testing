export interface IDataTable {
  readonly inputs: any[];
  readonly expected: any;
}

export interface IDataTableArray {
  readonly methodName: string;
  readonly dataTable: IDataTable[];
}
