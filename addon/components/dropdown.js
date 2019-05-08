import Component from '@ember/component';
import layout from '../templates/components/dropdown';

export default Component.extend({
  layout,
  classNameBindings: ['multiple:cs-component-dropdown--multiple:cs-component-dropdown', 'isOpen:is-open'],
  selected: null,
  multiple: false,
  labelText: 'Select an option',
  searchField: 'name'
});
