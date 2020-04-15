class EventEmitter {

  constructor() {
    this.events = {}
  }

  on(name, fn) {
    if (this.events[name]) {
      this.events[name]["fns"].push(fn);
    } else {
      this.events[name] = {
        fns: [fn]
      }
    }
  }

  emit(name) {
    var args = [].slice.call(arguments,1);
    this.events[name].fns.forEach((fn) => {
      fn.apply(this, args);
    })
  }
}

let emit = new EventEmitter();
emit.on('click', (a) => {
  console.log('click1');
  console.log(a);
})

emit.on('click', (b) => {
  console.log('click2');
  console.log(b);
})

emit.on('click', (c) => {
  console.log('click2');
  console.log(c);
})

emit.emit('click', 'aaa');