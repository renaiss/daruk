import { Daruk, DarukContext, defineMiddleware, MiddlewareClass, Next } from '..';

@defineMiddleware('cors')
class CorsMiddleware implements MiddlewareClass {
  public initMiddleware(_daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      await next();
    };
  }
}
