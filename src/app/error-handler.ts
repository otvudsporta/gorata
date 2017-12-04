import { Injectable, ErrorHandler as NgErrorHandler } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Injectable()
export class ErrorHandler extends NgErrorHandler {
  constructor(private notify: NotificationsService) {
    super();
  }

  handleError(error: Error | string) {
    this.notify.error(typeof error === 'string' ? error : error.message);
  }
}
