import TextField from './text-field';

const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const SPECIAL_CHARACTER_REGEX = /\W|_/;

export default TextField.extend({
  classNames: ['cs-component-password-field'],
  type: 'password',
  dataTestName: 'password',
  iconComponent: 'password-field/visibility-toggle',
  successMessage: 'Thank you.',
  label: 'Enter your password',
  minLength: 6,
  mustIncludeUppercase: false,
  mustIncludeLowercase: false,
  mustIncludeNumber: false,
  mustIncludeSpecialCharacter: false,

  actions: {
    handleInput(ev) {
      let value = ev.target.value;
      this.set('value', value);

      if (!value && !this.required) {
        this.set('invalid', false);
        return this.set('validationMessage', '');
      }

      if (typeof this.validate === 'function') {
        let { valid, message } = this.validate(value);
        let validationMessage;

        this.set('invalid', !valid);
        validationMessage = this.invalid ? message : this.successMessage;

        return this.set('validationMessage', validationMessage);
      }

      if (value.length < this.minLength) {
        this.setProperties({
          invalid: true,
          validationMessage: `Password must be at least ${this.minLength} characters`
        });
      } else if (this.mustIncludeUppercase && !UPPERCASE_REGEX.test(value)) {
        this.setProperties({
          invalid: true,
          validationMessage: 'Password must include at least one uppercase character.'
        });
      } else if (this.mustIncludeLowercase && !LOWERCASE_REGEX.test(value)) {
        this.setProperties({
          invalid: true,
          validationMessage: 'Password must include at least one lowercase character.'
        });
      } else if (this.mustIncludeNumber && !/\d/.test(value)) {
        this.setProperties({
          invalid: true,
          validationMessage: 'Password must include at least one number.'
        });
      } else if (this.mustIncludeSpecialCharacter && !SPECIAL_CHARACTER_REGEX.test(value)) {
        this.setProperties({
          invalid: true,
          validationMessage: 'Password must include at least one special character.'
        });
      } else {
        this.setProperties({
          invalid: false,
          validationMessage: this.successMessage
        });
      }
    }
  }
});
