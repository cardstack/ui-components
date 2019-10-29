import BaseComponent from '../base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Input extends BaseComponent {
  @tracked value;

  get options() {
    return {
      inputFormat: 'mm/dd/yyyy',
      outputFormat: 'yyyy-mm-dd',
      showMaskOnHover: false
    }
  }

  @action
  updateValue(element, [value]) {
    this.value = value;
  }
}
