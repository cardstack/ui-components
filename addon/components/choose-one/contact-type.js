import ChooseOne from '../choose-one';

export default ChooseOne.extend({
  attributeBindings: ['dataTestName:data-test-cs-component-choose-contact-type'],
  performActions(selectedValue) {
    if (selectedValue === '_add') {
      this.setAddNewTypeVisible(true);
    }
    this._super(...arguments);
  },
});
