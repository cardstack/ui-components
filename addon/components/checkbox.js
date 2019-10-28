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

    this.value = value;
    this.checked = checked;

    if (checked && !this.required) {
      this.invalid = false;
      return this.validationMessage = '';
    }

    if (!checked && this.required) {
      this.invalid = true;
      return this.validationMessage = this.requiredMessage;
    }

    if (checked && this.required) {
      this.invalid = false;
      return this.validationMessage = 'Thank you.';
    }
  }
}
