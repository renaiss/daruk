import { BindTarget } from '../../../src/typings/function';
import {
  Daruk,
  DarukContext,
  defineMiddleware,
  middleware,
  MiddlewareClass,
  Next
} from '../../../src';

export default function error() {
  return <P extends string>(
    target: BindTarget<P>,
    propertyKey: P,
    descriptor: PropertyDescriptor
  ) => {
    middleware('error')(target, propertyKey, descriptor);
  };
}

@defineMiddleware('error')
class ErrorMiddleware implements MiddlewareClass {
  public initMiddleware(_daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      try {
        await next();
      } catch (error) {
        ctx.type = 'application/json';
        ctx.body = {
          state: false,
          message: error instanceof Error ? error.message : '未知错误'
        };
      }
    };
  }
}
