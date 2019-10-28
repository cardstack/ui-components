import Component from '@glimmer/component';

export default class ChooseOne extends Component {
  dataTestName = 'choose-one';

  performActions(changed) {
    if (this.args.performActions) {
      this.args.performActions(changed);
    }

    this.checked = !!this.selectedItem;
    this.selectionChanged(changed);
  }

  selectionChanged = () => {};
}
