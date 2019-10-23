import Component from '@ember/component';
import layout from '../templates/components/dropdown';

export default Component.extend({
  layout,
  dataTestName: 'dropdown',
  fieldType: 'text',
  // FIXME: set this to this.args.selected
  selected: null,
  isFocused: false,
  label: 'Select an option',
  showLabelInViewMode: false,
  // FIXME: set this to this.args.searchField
  searchField: 'name',
  // FIXME: set this to this.args.searchEnabled
  searchEnabled: true,
  allowClear: true,

  changeAction(item) {
    this.set('selected', item);
  },
});
