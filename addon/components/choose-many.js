import Component from '@ember/component';
import layout from '../templates/components/choose-many';

export default Component.extend({
  layout,
  classNames: ['cs-component-choose-many'],
  classNameBindings: ['checked:checked'],
  attributeBindings: ['dataTestName:data-test-cs-component-choose-many'],
  dataTestName: true,

  performActions: function(selectedItems) {
    this.set('checked', !!selectedItems.length);
    this.selectionChanged(selectedItems);
  },

  selectionChanged: () => {}
});
