import BaseComponent from '../base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
// import { attributeBindings } from '@ember-decorators/component';

// @attributeBindings('type', '_value:value', 'required')
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
    console.log('date-picker/index updated value to', value);
    this.value = value;
  }
}
