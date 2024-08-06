import { IAssertion } from './lib/interfaces';

export function Case(caseDescription: string): MethodDecorator;
export function Test(testName: string): ClassDecorator;
export function assertThat(actual: any): IAssertion;
