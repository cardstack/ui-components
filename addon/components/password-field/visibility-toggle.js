import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNameBindings: ['textVisible:hide'],
  attributeBindings: ['dataTestName:data-test-cs-component-password-field-visibility-toggle'],
  dataTestName: true,

  textVisible: computed('type', function() {
    return this.type !== 'password';
  }),

  click() {
    if (this.textVisible) {
      this.changeType('password');
    } else {
      this.changeType('text');
    }
  }
});
