import Component from '@ember/component';
import layout from '../templates/components/text-field';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['cs-component-text-field'],
  required: false,
  inputId: computed('elementId', function() {
    return `${this.elementId}-input`;
  })
});
