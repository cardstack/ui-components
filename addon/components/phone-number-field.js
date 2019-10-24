import { inject as service } from '@ember/service';
import TextField from './text-field';

export default class PhoneNumberField extends TextField {
  @service phoneInput;

  className = 'cs-component-phone-number';
  dataTestName = 'phone-number';
  type = 'tel';
  fieldType = 'text';
  label = 'Phone Number';
  inputComponent = '';

  constructor(...args) {
    super(...args);

    this.phoneInput.load().then(() => {
      this.inputComponent = 'phone-number-field/input';
    });
  }
}
