import Component from '@glimmer/component';

export default class ChooseMany extends Component {
  dataTestName = 'choose-many';

  performActions(selectedItems) {
    this.checked = !!selectedItems.length;
    this.selectionChanged(selectedItems);
  }

  selectionChanged = () => {};
}
