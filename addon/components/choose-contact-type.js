import ChooseOne from './choose-one';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default ChooseOne.extend({
  classNames: ['cs-component-choose-contact-type'],
  choices: A([
    { name: 'Cell', value: 'cell' },
    { name: 'Home', value: 'home' },
    { name: 'Work', value: 'work' }
  ]),
  selectedItem: 'cell'
});
