import Component from '@ember/component';
import layout from '../templates/components/email';

export default Component.extend({
  layout,
  classNames: ['cs-component-email'],
  attributeBindings: ['dataTestName:data-test-cs-component-email'],
  dataTestName: true,
  required: false,
  value: '',
  validationMessage: '',
  invalid: false,

  handleInput(ev) {
    let value = ev.target.value.trim();
    let errorMessage = ev.target.validationMessage;

    this.set('value', value);

    if (!value && !this.required) {
      this.set('invalid', false);
      return this.set('validationMessage', '');
    }

    if (errorMessage) {
      this.set('invalid', true);
      return this.set('validationMessage', errorMessage);
    }

    if (!errorMessage) {
      this.set('invalid', false);
      return this.set('validationMessage', 'Thank you.');
    }
  },
});
