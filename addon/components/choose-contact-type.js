import Component from '@glimmer/component';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { empty } from '@ember/object/computed';

export default class ChooseContactType extends Component {
  addNewTypeVisible = false;
  newContactType = '';

  @empty('newContactType')
  newContactTypeIsEmpty;

  choices = A([
    { name: 'Cell', value: 'cell' },
    { name: 'Home', value: 'home' },
    { name: 'Work', value: 'work' },
    { name: 'Add+', value: '_add' },

  ]);
  selectedItem = 'cell';

  @action
  addContactType() {
    const secondToLastPosition = this.choices.length - 1;
    this.choices.insertAt(secondToLastPosition, { name: this.newContactType, value: this.newContactType });
    this.set('selectedItem', this.newContactType);
    this.set('newContactType', '');
    this.set('addNewTypeVisible', false);
  }

  @action
  performActions(selectedValue) {
    if (selectedValue === '_add') {
      this.setAddNewTypeVisible(true);
    }
  }
}
