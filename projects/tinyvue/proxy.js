let activeEffect;

class Dep {
  subscribers = new Set();

  constructor(value) {
    this._value = value;
  }

  get value() {
    this.depend();
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.notify();
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach((effect) => {
      effect();
    });
  }
}

function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

const reactiveHandlers = {
  get(target, key) {
    const value = getDep(target, key).value;
    if (value && typeof value === "object") {
      return reactive(value);
    } else {
      return value;
    }
  },
  set(target, key, value) {
    getDep(target, key).value = value;
  },
};

const targetToHashMap = new WeakMap();

function getDep(target, key) {
  let depMap = targetToHashMap.get(target);
  if (!depMap) {
    targetToHashMap.set(target, (depMap = new Map()));
  }

  let dep = depMap.get(key);
  if (!dep) {
    depMap.set(key, (dep = new Dep(target[key])));
  }

  return dep;
}

function reactive(obj) {
  return new Proxy(obj, reactiveHandlers);
}

/**
 * 测试
 */
const state = reactive({
  count: 0,
});

watchEffect(() => {
  console.log(state.count);
});

state.count++;
