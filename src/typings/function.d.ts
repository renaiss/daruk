export type PromiseVoid = Promise<void>;
export type PromiseVoidFunc = () => Promise<void>;
export type PromiseVoidArgsFunc = (...args: any[]) => Promise<void>;
export type ClassFunc<
  Name extends string | symbol = string | symbol,
  Func extends Function = PromiseVoidArgsFunc
> = { [key in Name]: Func };
export type BindTarget<Name extends string | symbol = string | symbol> = ClassFunc<
  Name,
  PromiseVoidArgsFunc
>;
