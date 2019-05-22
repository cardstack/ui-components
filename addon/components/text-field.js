import Component from '@ember/component';
import layout from '../templates/components/text-field';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['cs-component-text-field'],
  attributeBindings: ['dataTestName:data-test-cs-component-text-field'],
  dataTestName: true,
  validationMessage: '',
  required: false,
  type: 'text',
  value: '',
  invalid: false,
  isComponentLibraryLoaded: true,
  inputId: computed('elementId', function() {
    return `${this.elementId}-input`;
  }),

  actions: {
    handleInput(ev) {
      let value = ev.target.value.trim();
      let errorMessage = ev.target.validationMessage;

      this.set('value', value);

      if (!value && !this.required) {
        this.set('invalid', false);
        return this.set('validationMessage', '');
      }

      if (errorMessage) {
        this.set('invalid', true);
        return this.set('validationMessage', errorMessage);
      }

      if (!errorMessage) {
        this.set('invalid', false);
        return this.set('validationMessage', 'Thank you.');
      }
    }
  }
});
