import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';
import { getOwner } from '@ember/application';

let nonce = 0;

export default class TextField extends BaseComponent {
  @tracked dataTestName = 'text-field';
  @tracked type = 'text';
  @tracked value = '';
  @tracked invalid = false;
  @tracked validationMessage = '';
  @tracked required = false;
  @tracked attributesToCopy = ['type', 'label', 'value', 'required', 'disabled', 'invalid', 'validationMessage', 'dataTestName', 'iconComponent', 'rows'];
  @tracked showLabelInViewMode = false;
  @tracked debounceMs = this.args.debounceMs || 500;
  fieldType = 'text';

  get inputId() {
    if (this.args.inputId) {
      return this.args.inputId;
    }

    return `${this.elementId}`;
  }

  get elementId() {
    return nonce++;
  }

  @action
  updateValue(element, [value, validationMessage, required]) {
    this.value = value;
    this.validationMessage = validationMessage;
    this.required = required;
  }

  @action
  inputEvent(evt) {
    if (this.debounceMs === 0) {
      this.handleInput(evt);
    } else {
      this.debouncedHandleInput.perform(evt);
    }
  }

  @restartableTask
  *debouncedHandleInput(evt) {
    yield timeout(this.debounceMs);
    this.handleInput(evt);
  }

  @action
  handleInput({ target: { value, validationMessage, title }}) {
    if (this.args.handleInput) {
      let [invalid, validationMessage] = this.args.handleInput(value);
      this.invalid = invalid;
      this.validationMessage = validationMessage;
    } else {
      this.value = value;

      if (this.args.changeAction) {
        this.args.changeAction(value);
      }

      if (!value && this.required) {
        this.invalid = true;
        this.validationMessage = 'This is a required field';
      } else if (validationMessage) {
        this.invalid = true;
        this.validationMessage = title || validationMessage;
      } else {
        this.invalid = false;
        this.validationMessage = '';
      }
    }

    if (!this.invalid && this.args.setValue) {
      this.args.setValue(value);
    }

    return;
  }
}
