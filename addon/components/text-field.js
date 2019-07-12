import Component from '@ember/component';
import layout from '../templates/components/text-field';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['cs-component-text-field'],
  attributeBindings: ['dataTestName:data-test-cs-component'],
  dataTestName: 'text-field',
  validationMessage: '',
  required: false,
  type: 'text',
  value: '',
  invalid: false,
  inputId: computed('elementId', function() {
    return `${this.elementId}-input`;
  }),

  actions: {
    handleInput(ev) {
      let value = ev.target.value.trim();
      let errorMessage = ev.target.validationMessage;

      this.set('value', value);

      if (this.changeAction) {
        this.changeAction(value);
      }

      if (!value && !this.required) {
        return this.setProperties({
          invalid: false,
          validationMessage: ''
        });
      }

      if (!value && this.required) {
        return this.setProperties({
          invalid: true,
          validationMessage: 'Please fill out this field.'
        });
      }

      if (errorMessage) {
        return this.setProperties({
          invalid: true,
          validationMessage: errorMessage
        });
      }

      return this.setProperties({
        invalid: false,
        validationMessage: 'Thank you.'
      });
    }
  }
});
