import { AnyFunction } from './anyFunction.type';

export type MethodNames<T> = {
  [K in keyof T]: T[K] extends AnyFunction ? K : never;
}[keyof T];
