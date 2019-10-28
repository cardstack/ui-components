import Component from '@glimmer/component';

export default class Dropdown extends Component {
  dataTestName = 'dropdown';
  fieldType = 'text';

  // FIXME: set this to this.args.selected
  selected = null;

  isFocused = false;
  label = 'Select an option';
  showLabelInViewMode = false;

  // FIXME: set this to this.args.searchField
  searchField = 'name';

  // FIXME: set this to this.args.searchEnabled
  searchEnabled = true;

  allowClear = true;

  changeAction(item) {
    this.selected = item;
  }
}
