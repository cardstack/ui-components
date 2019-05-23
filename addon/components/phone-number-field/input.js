import PhoneInput from 'ember-phone-input/components/phone-input';

export default PhoneInput.extend({
  autoPlaceholder: 'aggressive',

  update(internationalPhoneNumber) {
    if (!internationalPhoneNumber) {
      return;
    }

    this.set('number', internationalPhoneNumber);
  },

  change() {
    const internationalPhoneNumber = this.number;
    this.setValue(internationalPhoneNumber);
    this._iti.setNumber(internationalPhoneNumber);
    const isValid = this._iti.isValidNumber();
    const validationMessage = isValid ? 'Thank you.' : 'Please enter a valid phone number.';
    this.setInvalid(!isValid);
    this.setValidationMessage(validationMessage);
  },
});
