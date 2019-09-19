import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
  values: A([null]),

  actions: {
    addComponent() {
      this.values.pushObject(null);
    },

    updateValue(index, value) {
      this.values.replace(index, 1, [value]);
    },
  }
});
