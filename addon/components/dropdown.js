import Component from '@ember/component';
import layout from '../templates/components/dropdown';

export default Component.extend({
  layout,
  dataTestName: 'dropdown',
  fieldType: 'text',
  selected: null,
  multiple: false,
  isFocused: false,
  label: 'Select an option',
  searchField: 'name',
  searchEnabled: true,
  allowClear: true,

  changeAction(item) {
    this.set('selected', item);
  },
});
