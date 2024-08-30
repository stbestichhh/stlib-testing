import { IDataSet, IDataTable } from '../lib/interfaces';

export function isTable(data: IDataSet[] | IDataTable): data is IDataTable {
  return 'inputs' in data;
}
