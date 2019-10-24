import Component from '@glimmer/component';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class MultiComponent extends Component {
  values = A([null]);

  @action
  addComponent() {
    this.values.pushObject(null);
  }

  @action
  updateValue(index, value) {
    this.values.replace(index, 1, [value]);
  }
}