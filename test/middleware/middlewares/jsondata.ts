import { BindTarget } from '../../../src/typings/function';
import {
  Daruk,
  DarukContext,
  defineMiddleware,
  middleware,
  MiddlewareClass,
  Next,
  type
} from '../../../src';

export default function jsondata() {
  return <P extends string>(
    target: BindTarget<P>,
    propertyKey: P,
    descriptor: PropertyDescriptor
  ) => {
    middleware('jsondata')(target, propertyKey, descriptor);
    type('application/json')(target, propertyKey, descriptor);
  };
}

@defineMiddleware('jsondata')
class JsonMiddlewareClass implements MiddlewareClass {
  public initMiddleware(_daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      await next();
      ctx.body = {
        state: true,
        data: ctx.body
      };
    };
  }
}
