export function AfterAll(description?: string): MethodDecorator {
  return function(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const constructor = target.constructor as any;

    if (!constructor.afterAll) {
      constructor.afterAll = [];
    }

    constructor.afterAll.push({ methodName: propertyKey, description })

    return descriptor;
  }
}

export function AfterEach(description?: string): MethodDecorator {
  return function(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const constructor = target.constructor as any;

    if (!constructor.afterEach) {
      constructor.afterEach = [];
    }

    constructor.afterEach.push({ methodName: propertyKey, description });

    return descriptor;
  }
}
