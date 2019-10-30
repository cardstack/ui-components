import ChooseOne from '../choose-one';

export default class ContactType extends ChooseOne {
  dataTestName = 'choose-contact-type';

  performActions(selectedValue) {
    if (selectedValue === '_add') {
      this.setAddNewTypeVisible(true);
    }
    super.performActions(...arguments);
  }
}
