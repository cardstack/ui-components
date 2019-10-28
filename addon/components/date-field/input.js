import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
// import { attributeBindings } from '@ember-decorators/component';

// @attributeBindings('type', '_value:value', 'required')
export default class Input extends Component {
  @tracked value;

  constructor(...args) {
    super(...args);
    set(this, 'value', this.args.value);
  }

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

  @action
  update(value) {
    this.value = value;
  }
}
