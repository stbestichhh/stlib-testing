export function Case(options?: string | { description?: string, timeout?: number }): MethodDecorator {
  return function (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const constructor = target.constructor as any;

    if (!constructor.testCases) {
      constructor.testCases = [];
    }

    const caseDescription = typeof options === 'string' ? options : options?.description;
    const timeout = typeof options !== 'string' ? options?.timeout : undefined;

    constructor.testCases.push({
      methodName: key,
      caseDescription,
      timeout,
    });

    return descriptor;
  };
}
