import Component from '@glimmer/component';
import { set } from '@ember/object';

export default class BaseComponent extends Component {
  constructor(...args) {
    super(...args);

    for (let arg of Object.keys(this.args)) {
      if (this.attributesToCopy) {
        if (this.attributesToCopy.includes(arg)) {
          set(this, arg, this.args[arg]);
        }
      } else {
        set(this, arg, this.args[arg]);
      }
    }
  }
}
