import Component from '@glimmer/component';
// import { attributeBindings } from '@ember-decorators/component';
import { action } from '@ember/object';

// @attributeBindings('type', '_value:value', 'required')
export default class Input extends Component {
  get options() {
    return {
      inputFormat: 'mm/dd/yyyy',
      outputFormat: 'yyyy-mm-dd',
      showMaskOnHover: false
    }
  }

  @action
  update(value) {
    debugger;
  }
}
