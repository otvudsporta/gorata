import { ErrorHandler as NgErrorHandler } from '@angular/core';

export class ErrorHandler extends NgErrorHandler {
  constructor() {
    super();
  }

  handleError(error: Error | string) {
    window.alert(typeof error === 'string' ? error : error.message);
  }
}
