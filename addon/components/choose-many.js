import BaseComponent from './base-component';
import { tracked } from '@glimmer/tracking';

export default class ChooseMany extends BaseComponent {
  @tracked checked;
  @tracked attributesToCopy = ['selectionChanged'];
  @tracked selectionChanged = () => {};
  dataTestName = 'choose-many';

  performActions(selectedItems) {
    this.checked = !!selectedItems.length;
    this.selectionChanged(selectedItems);
  }

}
