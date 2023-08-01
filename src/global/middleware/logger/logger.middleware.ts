import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, body, query, params, ip } = req;
    this.logger.info('route', {
      req: {
        method,
        url,
        body,
        query,
        params,
        ip,
      },
    });
    next();
  }
}
