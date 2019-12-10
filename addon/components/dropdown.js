import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Dropdown extends BaseComponent {
  @tracked selected = null;
  @tracked label = 'Select an option';
  @tracked searchField = 'name';
  @tracked dataTestName = 'dropdown';
  @tracked searchEnabled = true;
  fieldType = 'text';
  isFocused = false;
  showLabelInViewMode = false;
  renderInPlace = true;

  @action
  updateSelected(element, [selected]) {
    this.selected = selected;
  }

  @action
  handleChange(value) {
    this.selected = value;

    if (this.args.changeAction) {
      this.args.changeAction(value);
    }
  }
}
