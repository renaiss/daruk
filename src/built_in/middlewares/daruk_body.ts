/**
 * @fileOverview koa-body 中间件
 * https://github.com/dlau/koa-body
 */

import koaBody = require('koa-body');
import Daruk from '../../core/daruk';

export default (app: Daruk) => {
  return koaBody(app.options.bodyOptions);
};
