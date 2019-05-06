import layout from '../templates/components/phone-number-field';
import TextField from './text-field';

export default TextField.extend({
  layout,
  label: 'Phone Number',
  required: true
});
