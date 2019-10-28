import Component from '@glimmer/component';
import { action, computed, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

let nonce = 0;
const ATTRIBUTES_TO_COPY = ['type', 'label', 'value', 'invalid', 'validationMessage', 'dataTestName'];

export default class TextField extends Component {
  @tracked dataTestName = 'text-field';
  @tracked value = '';
  @tracked invalid = false;
  @tracked validationMessage = '';
  required = false;
  showLabelInViewMode = false;
  type = 'text';
  fieldType = 'text';

  constructor(...args) {
    super(...args);

    // FIXME: we probably don't want to set a property for every attribute, just a select few
    for (let arg of Object.keys(this.args)) {
      if (ATTRIBUTES_TO_COPY.includes(arg)) {
        set(this, arg, this.args[arg]);
      }
    }
  }

  @computed('elementId')
  get inputId() {
    return `text-field-input-${this.elementId}`;
  }

  get elementId() {
    return nonce++;
  }

  get onFieldUpdated() {
    this.value = this.args.value;
  }

  @action
  handleInput(value) {
    if (this.args.handleInput) {
      let [invalid, validationMessage] = this.args.handleInput(value);
      this.invalid = invalid;
      this.validationMessage = validationMessage;
      return
    }

    let validationMessage = this.validationMessage;

    this.value = value;

    if (this.changeAction) {
      this.changeAction(value);
    }

    if (!value && !this.required) {
      this.invalid = false;
      this.validationMessage = '';
    }

    if (!value && this.required) {
      this.invalid = false;
      this.validationMessage = 'Please fill out this field.';
    }

    if (validationMessage) {
      this.invalid = true;
      this.validationMessage = validationMessage;
    }

    this.invalid = false;
    this.validationMessage = 'Thank you.';

    return;
  }
}
