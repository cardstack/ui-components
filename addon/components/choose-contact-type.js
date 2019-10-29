import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class ChooseContactType extends BaseComponent {
  @tracked addNewTypeVisible = false;
  @tracked newContactType = '';


  get newContactTypeIsEmpty() {
    return !!this.newContactType;
  }

  @tracked choices = A([
    { name: 'Cell', value: 'cell' },
    { name: 'Home', value: 'home' },
    { name: 'Work', value: 'work' },
    { name: 'Add+', value: '_add' },

  ]);
  @tracked selectedItem = 'cell';

  @action
  addContactType() {
    const secondToLastPosition = this.choices.length - 1;
    this.choices.insertAt(secondToLastPosition, { name: this.newContactType, value: this.newContactType });
    this.selectedItem = this.newContactType;
    this.newContactType = '';
    this.addNewTypeVisible = false;
  }

  @action
  performActions(selectedValue) {
    if (selectedValue === '_add') {
      this.addNewTypeVisible = true;
    }
  }
}
