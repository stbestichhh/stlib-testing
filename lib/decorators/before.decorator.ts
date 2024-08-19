export function BeforeAll(description?: string): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const constructor = target.constructor as any;

    if (!constructor.beforeAll) {
      constructor.beforeAll = [];
    }

    constructor.beforeAll.push({ methodName: propertyKey, description });

    return descriptor;
  };
}

export function BeforeEach(description?: string): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const constructor = target.constructor as any;

    if (!constructor.beforeEach) {
      constructor.beforeEach = [];
    }

    constructor.beforeEach.push({ methodName: propertyKey, description });

    return descriptor;
  };
}
