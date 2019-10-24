import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class VisibilityToggle extends Component {
  @tracked type;

  get textVisible() {
    return this.type !== 'password';
  }

  click() {
    if (this.textVisible) {
      this.changeType('password');
    } else {
      this.changeType('text');
    }
  }
}
