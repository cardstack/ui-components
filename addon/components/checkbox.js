import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

let nonce = 0;

export default class Checkbox extends BaseComponent {
  @tracked validationMessage;
  @tracked invalid;
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
      this.validationMessage = '';
    }

    if (!checked && this.required) {
      this.invalid = true;
      this.validationMessage = this.requiredMessage;
    }

    if (checked && this.required) {
      this.invalid = false;
      this.validationMessage = 'Thank you.';
    }

    return;
  }
}
