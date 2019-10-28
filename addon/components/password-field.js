import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const SPECIAL_CHARACTER_REGEX = /\W|_/;
const ATTRIBUTES_TO_COPY = [ 'minLength', 'mustIncludeUppercase', 'mustIncludeLowercase', 'mustIncludeNumber', 'mustIncludeSpecialCharacter', 'successMessage'];

export default class PasswordField extends Component {
  @tracked invalid = false;
  @tracked validationMessage = '';
  type = 'password';
  fieldType = 'text';
  dataTestName = 'password';
  iconComponent = 'password-field/visibility-toggle';
  successMessage = 'Thank you.';
  label = 'Enter your password';
  minLength = 6;
  mustIncludeUppercase = false;
  mustIncludeLowercase = false;
  mustIncludeNumber = false;
  mustIncludeSpecialCharacter = false;
  className = 'cs-component-password-field';

  constructor(...args) {
    super(...args);

    for (let arg of Object.keys(this.args)) {
      if (ATTRIBUTES_TO_COPY.includes(arg)) {
        set(this, arg, this.args[arg]);
      }
    }
  }

  @action
  handleInput(value) {
    this.value = value;

    if (!value && !this.required) {
      this.invalid = false;
      this.validationMessage =  '';
    }

    if (typeof this.validate === 'function') {
      let { valid, message } = this.validate(value);

      this.invalid = !valid;
      this.validationMessage =  this.invalid ? message : this.successMessage;
    }

    if (value.length < this.minLength) {
      this.invalid = true;
      this.validationMessage =  `Password must be at least ${this.minLength} characters`;
    } else if (this.mustIncludeUppercase && !UPPERCASE_REGEX.test(value)) {
      this.invalid = true;
      this.validationMessage =  'Password must include at least one uppercase character.';
    } else if (this.mustIncludeLowercase && !LOWERCASE_REGEX.test(value)) {
      this.invalid = true;
      this.validationMessage =  'Password must include at least one lowercase character.';
    } else if (this.mustIncludeNumber && !/\d/.test(value)) {
      this.invalid = true;
      this.validationMessage =  'Password must include at least one number.';
    } else if (this.mustIncludeSpecialCharacter && !SPECIAL_CHARACTER_REGEX.test(value)) {
      this.invalid = true;
      this.validationMessage =  'Password must include at least one special character.';
    } else {
      this.invalid = false;
      this.validationMessage =  this.successMessage;
    }

    return [this.invalid, this.validationMessage];
  }
}
