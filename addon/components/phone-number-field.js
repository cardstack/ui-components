import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PhoneNumberField extends Component {
  @service phoneInput;

  className = 'cs-component-phone-number';
  dataTestName = 'phone-number';
  type = 'tel';
  fieldType = 'text';
  label = 'Phone Number';

  @tracked inputComponent = '';
  autoPlaceholder = 'aggressive';

  constructor(...args) {
    super(...args);

    this.phoneInput.load().then(() => {
      this.inputComponent = 'phone-number-field/input';
    });
  }

  @action
  update(updateValue, updateValidationMessage, internationalPhoneNumber, meta) {
    if (!internationalPhoneNumber) {
      return;
    }

    this.value = internationalPhoneNumber;
    updateValue(internationalPhoneNumber);
    let isValid = meta.isValidNumber;
    this.invalid = !isValid;
    let validationMessage = isValid ? 'Thank you.' : 'Please enter a valid phone number.';
    updateValidationMessage(validationMessage);
  }
}
