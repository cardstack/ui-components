import Component from '@glimmer/component';

export default class ChooseOne extends Component {
  dataTestName = 'choose-one';

  performActions(changed) {
    this.set('checked', !!this.selectedItem);
    this.selectionChanged(changed);
  }

  selectionChanged = () => {};
}
