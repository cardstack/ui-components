import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

let nonce = 0;

export default class TextField extends Component {
  @tracked dataTestName = 'text-field';
  @tracked value = '';
  validationMessage = '';
  required = false;
  showLabelInViewMode = false;
  type = 'text';
  fieldType = 'text';
  invalid = false;

  constructor(...args) {
    super(...args);

    this.value = this.args.value;
    console.log(Object.keys(this.args).join(','));
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
  handleInput(ev) {
    let value = ev.target.value.trim();
    let errorMessage = ev.target.validationMessage;

    this.value = value;

    if (this.changeAction) {
      this.changeAction(value);
    }

    if (!value && !this.required) {
      return this.setProperties({
        invalid: false,
        validationMessage: ''
      });
    }

    if (!value && this.required) {
      return this.setProperties({
        invalid: true,
        validationMessage: 'Please fill out this field.'
      });
    }

    if (errorMessage) {
      return this.setProperties({
        invalid: true,
        validationMessage: errorMessage
      });
    }

    return this.setProperties({
      invalid: false,
      validationMessage: 'Thank you.'
    });
  }
}
