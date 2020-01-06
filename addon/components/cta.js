import BaseComponent from './base-component';

export default class Cta extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.handleClick = this.args.handleClick || (() => {});
  }
}
