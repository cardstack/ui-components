import Component from '@ember/component';
import layout from '../templates/components/choose-one';

export default Component.extend({
  layout,
  classNames: ['cs-component--choose-one'],
  classNameBindings: ['checked:checked'],
  attributeBindings: ['dataTestName:data-test-cs-component-choose-one'],
  dataTestName: true,

  performActions: function(changed) {
    this.set('checked', !!this.selectedItem);
    this.selectionChanged(changed);
  },

  selectionChanged: () => {}
});
