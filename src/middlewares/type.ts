import { Daruk, DarukContext, defineMiddleware, MiddlewareClass, Next } from '..';

interface TypeInfo {
  type: string;
}

@defineMiddleware('type')
class TypeMiddlewareClass implements MiddlewareClass {
  public initMiddleware(_daruk: Daruk) {
    return ({ type }: TypeInfo) => {
      return async (ctx: DarukContext, next: Next) => {
        ctx.type = type;
        await next();
      };
    };
  }
}
