import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Dropdown extends BaseComponent {
  @tracked selected = null;
  @tracked label = 'Select an option';
  @tracked placeholder = 'Please select';
  @tracked searchField = 'name';
  @tracked dataTestName = 'dropdown';
  @tracked searchEnabled = true;
  @tracked invalid = false;
  @tracked validationMessage = '';
  @tracked required = false;
  fieldType = 'text';
  isFocused = false;
  showLabelInViewMode = false;
  renderInPlace = true;

  @action
  updateSelected(element, [selected, validationMessage, required]) {
    this.selected = selected;
    this.validationMessage = validationMessage;
    this.required = required;
  }

  @action
  handleChange(value) {
    this.selected = value;

    if (this.args.changeAction) {
      this.args.changeAction(value);
    }

    if (!value && this.required) {
      this.invalid = true;
      this.validationMessage = 'This is a required field';
    } else {
      this.invalid = false;
      this.validationMessage = '';
    }

    if (!this.invalid && this.args.setValue) {
      this.args.setValue(value);
    }

    return;
  }
}
