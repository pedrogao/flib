export interface Options {
  lazy?: boolean;
  scheduler?: any; // TODO
}

export type Callback = Function;

const effectStack: Array<Callback> = [];
let activeEffect: Callback | undefined;

export function effect(fn: Callback, option: Options = {}) {
  const effectFn = () => {
    try {
      effectStack.push(effectFn);
      activeEffect = effectFn;
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  if (!option.lazy) {
    effectFn();
  }
  effectFn.scheduler = option.scheduler;
}

const targetMap = new WeakMap();

export function track(target: object, key: string | symbol) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // depsMap初始化后，并立马赋值给参数
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect);
}

export function trigger(target: object, key: string | symbol) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const dep: Callback[] = depsMap.get(key);
  if (!dep) {
    return;
  }
  dep.forEach((effectFn) => {
    // @ts-ignore
    if (effectFn.scheduler) {
      // @ts-ignore
      effectFn.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
