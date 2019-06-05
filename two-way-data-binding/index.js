const elements = document.querySelectorAll('[v-bind]');
// eslint-disable-next-line no-console
console.log(elements);

const data = {};

function addProps(prop) {
  let value;
  // eslint-disable-next-line no-prototype-builtins
  if (!data.hasOwnProperty(prop)) {
    Object.defineProperty(data, prop, {
      set(newValue) {
        value = newValue;
        elements.forEach((element) => {
          const ele = element;
          if (ele.getAttribute('v-bind') === prop) {
            if (ele.type && (ele.type === 'text')) {
              // For <input> tag
              ele.value = newValue;
            } else if (!ele.type) {
              // For <span> tag
              ele.innerHTML = newValue;
            }
          }
        });
      },
      get() {
        return value;
      },
      enumerable: true,
    });
  }
}

elements.forEach((element) => {
  const ele = element;
  if (ele.type === 'text') {
    const prop = ele.getAttribute('v-bind');
    addProps(prop);
    ele.oninput = () => {
      data[prop] = ele.value;
      // eslint-disable-next-line no-console
      console.log(data);
    };
  }
});
