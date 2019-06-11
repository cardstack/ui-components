import Component from '@ember/component';
import { A } from '@ember/array';
import { empty } from '@ember/object/computed';
import layout from '../templates/components/choose-contact-type';

export default Component.extend({
  layout,
  classNames: ['cs-component-choose-contact-type'],
  addNewTypeVisible: false,
  newContactType: '',
  newContactTypeIsEmpty: empty('newContactType'),
  choices: A([
    { name: 'Cell', value: 'cell' },
    { name: 'Home', value: 'home' },
    { name: 'Work', value: 'work' },
    { name: 'Add+', value: '_add' },

  ]),
  selectedItem: 'cell',

  actions: {
    addContactType() {
      const secondToLastPosition = this.choices.length - 1;
      this.choices.insertAt(secondToLastPosition, { name: this.newContactType, value: this.newContactType });
      this.set('selectedItem', this.newContactType);
      this.set('newContactType', '');
      this.set('addNewTypeVisible', false);
    }
  }
});
