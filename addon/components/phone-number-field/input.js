import PhoneInput from 'ember-phone-input/components/phone-input';

export default PhoneInput.extend({
  autoPlaceholder: 'aggressive',

    // const { intlTelInput } = window;

    // // XXX For some reason calling this._super doesn't work
    // const {
    //   autoPlaceholder,
    //   initialCountry,
    //   onlyCountries,
    //   preferredCountries
    // } = this

    // var input = document.getElementById(this.elementId)
    // var _iti = intlTelInput(input, {
    //   autoHideDialCode: true,
    //   nationalMode: true,
    //   autoPlaceholder,
    //   initialCountry,
    //   onlyCountries,
    //   preferredCountries
    // })

    // const number = this.number
    // if (number) {
    //   _iti.setNumber(number)
    // }
    // this._iti = _iti

    // if (this.initialCountry) {
    //   this._iti.setCountry(this.initialCountry)
    // }

    // this.update(number, this._metaData(_iti))
    // this.element.addEventListener(
    //   'countrychange',
    //   this.onCountryChange.bind(this)
    // )

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
