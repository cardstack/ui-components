import TextField from './text-field';

const EMAIL_REGEX = /^([a-zA-Z0-9+_\-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;

export default TextField.extend({
  classNames: ['cs-component-email'],
  dataTestName: 'email',
  label: 'Enter your email',
  inputmode: 'email',
  inputComponent: 'email-field/input',

  actions: {
    handleInput(ev) {
      let value = ev.target.value;
      this.set('value', value);

      if (!value && !this.required) {
        return this.setProperties({
          invalid: false,
          validationMessage: ''
        });
      }

      if (!value && this.required) {
        return this.setProperties({
          invalid: true,
          validationMessage: 'This field is required. Please enter your email address.'
        });
      }

      if (!EMAIL_REGEX.test(value)) {
        return this.setProperties({
          invalid: true,
          validationMessage: 'Please enter your email address in the format "address@domain.com"'
        })
      }

      return this.setProperties({
        invalid: false,
        validationMessage: 'Thank you.'
      });
    }
  }
});
