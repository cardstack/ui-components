import MultiComponent from './multi-component';
import layout from '../templates/components/phone-number-fields';

export default MultiComponent.extend({
  layout,
  classNames: ['cs-component-phone-number-fields'],
  label: 'Enter your phone number'
});