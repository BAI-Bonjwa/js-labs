let elements = document.querySelectorAll('[v-bind]');
console.log(elements);

let data = {};

elements.forEach((ele) => {
  if (ele.type === 'text') {
    let prop = ele.getAttribute('v-bind');
    addProps(prop);
    ele.oninput = () => {
      data[prop] = ele.value;
      console.log(data);
    }
  }
});

function addProps(prop) {
  if (!data.hasOwnProperty(prop)) {
    Object.defineProperty(data, prop, {
      set: (newValue) => {
        value = newValue;
        elements.forEach(function (ele) {
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
      get: () => {
        return value;
      },
      enumerable: true
    });
  }
}