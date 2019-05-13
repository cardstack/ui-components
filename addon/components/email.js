import TextField from './text-field';

export default TextField.extend({
  classNames: ['cs-component-email'],
  attributeBindings: ['dataTestName:data-test-cs-component-email'],
  type: 'email'
});
