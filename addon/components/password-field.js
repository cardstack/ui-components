import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const SPECIAL_CHARACTER_REGEX = /\W|_/;

export default class PasswordField extends BaseComponent {
  @tracked value;
  @tracked invalid = false;
  @tracked validationMessage = '';
  @tracked label = 'Enter your password';
  @tracked minLength = 6;
  @tracked mustIncludeUppercase = false;
  @tracked mustIncludeLowercase = false;
  @tracked mustIncludeNumber = false;
  @tracked mustIncludeSpecialCharacter = false;
  @tracked iconComponent = 'password-field/visibility-toggle';
  type = 'password';
  fieldType = 'text';
  dataTestName = 'password';
  successMessage = 'Thank you.';
  className = 'cs-component-password-field';
  attributesToCopy = [ 'minLength', 'mustIncludeUppercase', 'mustIncludeLowercase', 'mustIncludeNumber', 'mustIncludeSpecialCharacter', 'successMessage'];

  constructor(...args) {
    super(...args);

    this.value = this.args.value;
  }

  @action
  handleInput(value) {
    this.value = value;

    if (!value && !this.required) {
      this.invalid = false;
      this.validationMessage =  '';
    }

    if (typeof this.args.validate === 'function') {
      let { valid, message } = this.args.validate(value);

      this.invalid = !valid;
      this.validationMessage =  this.invalid ? message : this.successMessage;
    } else if (value.length < this.minLength) {
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
