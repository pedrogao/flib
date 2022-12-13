class DOM {
  #eventObj = {
    click: [],
    mouseover: [],
    mouseout: [],
    mousemove: [],
    keydown: [],
    keyup: [],
  };

  addEventListener(event, fn) {
    this.#eventObj[event].push(fn);
  }

  removeEventListener(event, fn) {
    const arr = this.#eventObj[event];
    const index = arr.indexOf(fn);
    arr.splice(index, 1);
  }

  click() {
    this.#eventObj.click.forEach((fn) => fn.apply(this));
  }

  keyup() {
    this.#eventObj.keyup.forEach((fn) => fn.apply(this));
  }

  keydown() {
    this.#eventObj.keydown.forEach((fn) => fn.apply(this));
  }

  mousemove() {
    this.#eventObj.mousemove.forEach((fn) => fn.apply(this));
  }

  mouseover() {
    this.#eventObj.mouseover.forEach((fn) => fn.apply(this));
  }

  mouseout() {
    this.#eventObj.mouseout.forEach((fn) => fn.apply(this));
  }
}

const dom = new DOM();

dom.addEventListener("click", () => console.log("点击啦！"));
dom.addEventListener("click", function () {
  console.log(this);
});

dom.addEventListener("mouseover", () => console.log("鼠标进入啦！"));
dom.addEventListener("mouseover", function () {
  console.log(this);
});

// 模拟点击事件
dom.click(); // 依次打印出：'点击啦！' 和相应的 this 对象

// 模拟鼠标事件
dom.mouseover(); // 依次打印出：'鼠标进入啦！' 和相应的 this 对象

const fn = () => {};
dom.addEventListener("click", fn);
// 还可以移除监听
dom.removeEventListener("click", fn);
