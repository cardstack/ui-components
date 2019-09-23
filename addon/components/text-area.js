import TextField from './text-field';
import layout from '../templates/components/text-area';

export default TextField.extend({
  layout,
  fieldType: 'text',
  classNames: ['cs-component-text-area'],
  dataTestName: 'text-area',
  rows: 3,
});
