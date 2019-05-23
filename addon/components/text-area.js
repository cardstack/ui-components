import TextField from './text-field';
import layout from '../templates/components/text-area';

export default TextField.extend({
  layout,
  classNames: ['cs-component-text-area'],
  attributeBindings: ['dataTestName:data-test-cs-component-text-area'],
  dataTestName: true,
  rows: 3,
});