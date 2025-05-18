import { HttpException, HttpStatus } from '@nestjs/common';

export class NotModifiedException extends HttpException {
  constructor(message = 'Not Modified') {
    super(message, HttpStatus.NOT_MODIFIED);
  }
}
