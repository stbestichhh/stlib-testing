import { IDataTable } from '../interfaces';

export function DataTable(dataTable: IDataTable[]): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const constructor = target.constructor as any;

    if (!constructor.testCasesDataTable) {
      constructor.testCasesDataTable = [];
    }

    constructor.testCasesDataTable.push({
      methodName: propertyKey,
      dataTable: dataTable,
    });

    return descriptor;
  };
}
