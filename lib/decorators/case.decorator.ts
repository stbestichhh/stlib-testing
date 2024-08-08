export function Case(caseDescription?: string): MethodDecorator {
  return function (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const constructor = target.constructor as any;

    if (!constructor.testCases) {
      constructor.testCases = [];
    }

    constructor.testCases.push({
      methodName: key,
      caseDescription,
    });

    return descriptor;
  };
}
