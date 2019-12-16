import BaseComponent from './base-component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PhoneNumberField extends BaseComponent {
  @service phoneInput;
  @tracked label = 'Phone number';
  @tracked inputComponent = '';

  className = 'cs-component-phone-number';
  dataTestName = 'phone-number';
  type = 'tel';
  fieldType = 'text';
  autoPlaceholder = 'aggressive';

  constructor(...args) {
    super(...args);
    this.phoneInput.load().then(() => {
      this.inputComponent = 'phone-number-field/input';
    });
  }

  @action
  update(updateValue, updateInvalid, updateValidationMessage, internationalPhoneNumber, meta) {
    if (!internationalPhoneNumber) {
      return;
    }

    this.value = internationalPhoneNumber;
    updateValue(internationalPhoneNumber);
    let isValid = meta.isValidNumber;
    this.invalid = !isValid;
    updateInvalid(this.invalid);
    let validationMessage = isValid ? '' : 'Please enter a valid phone number.';
    updateValidationMessage(validationMessage);
  }
}
