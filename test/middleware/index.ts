import { controller, cors, DarukContext, DarukServer, get, Next } from '../../src';
import jsondata from './middlewares/jsondata';
import error from './middlewares/error';

// 使用中间件进行`Content-Type`设置，以及异常处理

@controller()
class mainController {
	@get('/index')
	@cors()
	@error()
	@jsondata()
	public async index(ctx: DarukContext, next: Next) {
		ctx.body = { a: 100, b: 200 };
		await next();
	}

	@get('/error')
	@cors()
	@error()
	@jsondata()
	public async error(ctx: DarukContext, next: Next) {
		ctx.body = { a: 100, b: 200 };
		throw new Error('error test');
		await next();
	}
}

const main = async function () {
	try {
		const app = DarukServer();
		await app.binding();
		app.listen(8898);
	} catch (error) {
		console.log(error);
	}
};

main(); /**
[
	{
		url: "http://127.0.0.1:8898/index",
		result:{
			state: true,
			data:{
				"a": 100,
				"b": 200
			}
		}
	}, {
		url :"http://127.0.0.1:8898/error",
		result:{
			state: false,
			message: "error test"
		}
	}
]
 */
