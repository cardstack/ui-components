import Component from '@ember/component';
import layout from '../templates/components/dropdown';

export default Component.extend({
  layout,
  dataTestName: 'dropdown',
  selected: null,
  multiple: false,
  label: 'Select an option',
  searchField: 'name'
});
