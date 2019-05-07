import OneWayPhoneMask from 'ember-inputmask/components/one-way-phone-mask';
import { computed } from '@ember/object';

export default OneWayPhoneMask.extend({
  attributeBindings: [
    'type',
    '_value:value',
    'required'
  ],
  options: computed(function() {
    return {
      showMaskOnHover: false
    }
  })
});
