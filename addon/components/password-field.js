import TextField from './text-field';

const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const SPECIAL_CHARACTER_REGEX = /\W|_/;

export default TextField.extend({
  classNames: ['cs-component-password-field'],
  type: 'password',
  iconComponent: 'password-field/visibility-toggle',
  minLength: 6,
  mustIncludeUppercase: false,
  mustIncludeLowercase: false,
  mustIncludeNumber: false,

  actions: {
    handleInput(ev) {
      let value = ev.target.value;

      if (!value && !this.required) {
        this.set('invalid', false);
        return this.set('validationMessage', '');
      }

      if (typeof this.validate === 'function') {
        let val = this.validate(value);
        this.set('invalid', !val);
        if (this.invalid) {
          this.set('validationMessage', 'Password must pass validations from the custom validate function.');
        } else {
          this.set('validationMessage', 'Thank you.');
        }
        return;
      }

      if (value.length < this.minLength) {
        this.set('invalid', true);
        this.set('validationMessage', `Password must be at least ${this.minLength} characters`);
      } else if (this.mustIncludeUppercase && !UPPERCASE_REGEX.test(value)) {
        this.set('invalid', true);
        this.set('validationMessage', 'Password must include at least one uppercase character.');
      } else if (this.mustIncludeLowercase && !LOWERCASE_REGEX.test(value)) {
        this.set('invalid', true);
        this.set('validationMessage', 'Password must include at least one lowercase character.');
      } else if (this.mustIncludeNumber && !/\d/.test(value)) {
        this.set('invalid', true);
        this.set('validationMessage', 'Password must include at least one number.');
      } else if (this.mustIncludeSpecialCharacter && !SPECIAL_CHARACTER_REGEX.test(value)) {
        this.set('invalid', true);
        this.set('validationMessage', 'Password must include at least one special character.');
      } else {
        this.set('invalid', false);
        this.set('validationMessage', 'Thank you.');
      }
    }
  }
});
