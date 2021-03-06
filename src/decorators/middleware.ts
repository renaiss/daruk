import assert = require('assert');
import { injectable } from 'inversify';
import is = require('is');
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { Constructor } from '../typings/daruk';
import { MIDDLEWARE_NAME } from './constants';
import { BindTarget } from '../typings/function';

/**
 * @desc middleware 中间件装饰器
 * @param {string} middlewareName - 中间件的名字
 * @param options
 * @return Decorator - 装饰器
 */

export function middleware(middlewareName: string, options?: { [key: string]: any }) {
  assert(is.string(middlewareName), `[Decorator @middleware] parameter must be a string`);
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 一个路由 handle 可能被多个 @middleware 修饰
    const middleares: any[] =
      Reflect.getMetadata(MIDDLEWARE_NAME, target.constructor, propertyKey) || [];
    middleares.unshift({ middlewareName, options });
    // 保存 @middleware 应用的所有中间件名字
    Reflect.defineMetadata(MIDDLEWARE_NAME, middleares, target.constructor, propertyKey);
  };
}

export function defineMiddleware(middlewareName: string) {
  return (target: Constructor) => {
    injectable()(target);
    darukContainer.bind<Constructor>(TYPES.Middleware).to(target).whenTargetNamed(middlewareName);
  };
}

export function cors() {
  return <P extends string>(
    target: BindTarget<P>,
    propertyKey: P,
    descriptor: PropertyDescriptor
  ) => {
    middleware('cors')(target, propertyKey, descriptor);
  };
}

/**
 * 设置 response Content-Type
 * @param {string} type - `Content-Type` 内容
 * @example
 *    @type('.png')
 *
 *    @type('png')
 *
 *    @type('image/png')
 *
 *    @type('text/plain; charset=utf-8')
 */
export function type(type: string) {
  return <P extends string>(
    target: BindTarget<P>,
    propertyKey: P,
    descriptor: PropertyDescriptor
  ) => {
    middleware('type', { type })(target, propertyKey, descriptor);
  };
}

export function json() {
  return <P extends string>(
    target: BindTarget<P>,
    propertyKey: P,
    descriptor: PropertyDescriptor
  ) => {
    type('application/json')(target, propertyKey, descriptor);
  };
}
