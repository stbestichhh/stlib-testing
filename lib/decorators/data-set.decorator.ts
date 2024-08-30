export function DataSet(...dataSets: any[][]): MethodDecorator {
  return function(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const constructor = target.constructor as any;

    if (!constructor.testCasesDataSets) {
      constructor.testCasesDataSets = [];
    }

    constructor.testCasesDataSets.push({
      methodName: propertyKey,
      dataSets: dataSets,
    });

    return descriptor;
  }
}
