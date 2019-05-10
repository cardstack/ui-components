import Component from '@ember/component';
import layout from '../templates/components/dropdown';

export default Component.extend({
  layout,
  classNameBindings: ['multiple:cs-component-dropdown--multiple:cs-component-dropdown', 'isOpen:is-open'],
  attributeBindings: ['dataTestName:data-test-cs-component-dropdown'],
  dataTestName: true,
  selected: null,
  multiple: false,
  label: 'Select an option',
  searchField: 'name'
});
