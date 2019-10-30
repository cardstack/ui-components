import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ChooseOne extends BaseComponent {
  @tracked checked;
  @tracked selectedItem;
  @tracked attributesToCopy = ['selectedItem', 'selectionChanged'];
  @tracked selectionChanged = () => {};
  dataTestName = 'choose-one';

  @action
  updateSelectedItem(element, [selectedItem]) {
    this.selectedItem = selectedItem;
  }

  performActions(changed) {
    if (this.args.performActions) {
      this.args.performActions(changed);
    }

    this.checked =  !!this.selectedItem;
    this.selectionChanged(changed);
  }
}
