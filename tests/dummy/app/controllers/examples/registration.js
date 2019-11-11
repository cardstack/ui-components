import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed, action } from '@ember/object';

export default Controller.extend({
  sourceOptions: A([ 'Magazine', 'Radio', 'EmberConf', 'Other']),
  isSubmitDisabled: computed('emailValue', 'isEmailValid', 'passwordValue', 'isPasswordValid', 'isCheckboxChecked', function() {
    return !(!!this.emailValue && !this.isEmailInvalid && !!this.passwordValue && !this.isPasswordInvalid && this.isCheckboxChecked);
  }),
  
  setChecked: action(function(propertyToSet, val) {
    this.set(propertyToSet, val);
  })
});