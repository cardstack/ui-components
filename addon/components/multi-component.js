import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class MultiComponent extends BaseComponent {
  @tracked values = A([null]);

  @action
  addComponent() {
    this.values.pushObject(null);
  }

  @action
  updateValue(index, value) {
    this.values.replace(index, 1, [value]);
  }
}