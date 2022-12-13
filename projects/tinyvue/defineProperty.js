let activeEffect;

class Dep {
  subscribers = new Set();

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach((effect) => effect());
  }
}

function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

function reactive(raw) {
  Object.keys(raw).forEach((key) => {
    const dep = new Dep();
    let realValue = raw[key];

    Object.defineProperty(raw, key, {
      get() {
        dep.depend();
        return realValue;
      },

      set(newValue) {
        realValue = newValue;
        dep.notify();
      },
    });
  });
  return raw;
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
