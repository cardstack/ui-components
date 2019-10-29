import BaseComponent from '../base-component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class VisibilityToggle extends BaseComponent {
  @tracked type;

  get textVisible() {
    return this.type !== 'password';
  }

  @action
  toggleVisibility() {
    if (this.textVisible) {
      this.changeType('password');
      this.type = "password";
    } else {
      this.changeType('text');
      this.type = "text";
    }
  }
}
