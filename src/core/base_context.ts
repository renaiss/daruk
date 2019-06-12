/**
 * @fileOverview controller、service 继承的基类
 * 用于挂载 app、ctx、service
 */

export default class BaseContext {
  public ctx: {
    [key: string]: any;
  };
  public app: {
    [key: string]: any;
  };
  public service: {
    [key: string]: any;
  };
  public constructor(ctx: { [key: string]: any }) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.service = ctx.service;
  }
}
