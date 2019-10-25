import Component from '@glimmer/component';
import { action, computed, set } from '@ember/object';
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

    // FIXME: we probably don't want to set a property for every attribute, just a select few
    for (let arg of Object.keys(this.args)) {
      set(this, arg, this.args[arg]);
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
