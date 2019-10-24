import { action } from '@ember/object';
import Component from '@glimmer/component';

let nonce = 0;

export default class Checkbox extends Component {
  requiredMessage = 'You must check this box!';
  value = 'on';

  get elementId() {
    return nonce++;
  }

  @action
  handleInput(ev) {
    let value = ev.target.value;
    let checked = ev.target.checked;

    this.set('value', value);
    this.set('checked', checked);

    if (checked && !this.required) {
      this.set('invalid', false);
      return this.set('validationMessage', '');
    }

    if (!checked && this.required) {
      this.set('invalid', true);
      return this.set('validationMessage', this.requiredMessage);
    }

    if (checked && this.required) {
      this.set('invalid', false);
      return this.set('validationMessage', 'Thank you.');
    }
  }
}
