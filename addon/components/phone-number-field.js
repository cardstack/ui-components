import TextField from './text-field';
import { inject as service } from '@ember/service';

export default TextField.extend({
  phoneInput: service(),
  classNames: ['cs-component-phone-number'],
  dataTestName: 'phone-number',
  type: 'tel',
  fieldType: 'text',
  label: 'Phone Number',
  inputComponent: '',

  init() {
    this._super(...arguments);
    this.phoneInput.load().then(() => {
      this.set('inputComponent', 'phone-number-field/input');
    });
  }
});
