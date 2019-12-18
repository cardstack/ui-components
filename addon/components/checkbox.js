import BaseComponent from './base-component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Checkbox extends BaseComponent {
  @tracked validationMessage;
  requiredMessage = "This field is required";

  get inputId() {
    return this.args.id || `checkbox-${guidFor(this)}`;
  }

  @action
  handleInput(ev) {
    let { checked, validationMessage } = ev.target;
    this.validationMessage = validationMessage;

    if (!checked && this.args.required) {
      return this.validationMessage = this.requiredMessage;
    }

    if (!this.validationMessage && this.args.setChecked) {
      return this.args.setChecked(checked);
    }

    return;
  }
}
