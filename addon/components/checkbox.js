import Component from '@ember/component';
import layout from '../templates/components/checkbox';

export default Component.extend({
  layout,
  classNames: ['cs-component-checkbox'],
  requiredMessage: 'You must check this box!',
  value: 'on',

  actions: {
    handleInput(ev) {
      let value = ev.target.value;
      let checked = ev.target.checked;

      this.set('value', value);
      this.set('checked', checked);

      if (checked && !this.required) {
        this.set('invalid', false);
        return this.set('validationMessage', '');
      }

      if (!checked && this.required) {
        this.set('invalid', true);
        return this.set('validationMessage', this.requiredMessage);
      }

      if (checked && this.required) {
        this.set('invalid', false);
        return this.set('validationMessage', 'Thank you.');
      }
    }
  }
});
