import MultiComponent from './multi-component';
import layout from '../templates/components/emails';

export default MultiComponent.extend({
  layout,
  classNames: ['cs-component-emails'],
  label: 'Enter your email'
});