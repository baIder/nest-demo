import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, map } from 'rxjs';
import { Logger } from 'winston';
import { getInfoFromReq } from 'src/global/helper/getInfoFromReq';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        this.logger.info('response', {
          responseData: data,
          req: getInfoFromReq(context.switchToHttp().getRequest()),
        });
        return {
          code: 0,
          message: '请求成功',
          data,
        };
      }),
    );
  }
}
