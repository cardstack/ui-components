import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Dropdown extends BaseComponent {
  @tracked selected = null;
  @tracked label = 'Select an option';
  @tracked searchField = 'name';
  @tracked dataTestName = 'dropdown';
  fieldType = 'text';
  isFocused = false;
  showLabelInViewMode = false;
  searchEnabled = true;

  allowClear = true;

  @action
  updateSelected(element, [selected]) {
    this.selected = selected;
  }

  changeAction(item) {
    this.selected = item;
  }
}
