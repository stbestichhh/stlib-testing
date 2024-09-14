export class LoggerService {
  constructor() {}

  public info(message: any) {
    console.info(message);
  }

  public error(error: unknown | string, verbose?: boolean) {
    if (error instanceof Error) {
      const msg = verbose ? error : error.message;
      console.error(msg);
    } else if (typeof error === 'string') {
      console.error(error);
    } else {
      console.error(`Unknown error:\n${error}`);
    }
  }
}
