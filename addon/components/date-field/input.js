import OneWayDateMask from 'ember-inputmask/components/one-way-date-mask';
import { computed } from '@ember/object';

export default OneWayDateMask.extend({
  attributeBindings: [
    'type',
    '_value:value',
    'required'
  ],
  options: computed(function() {
    return {
      inputFormat: 'mm/dd/yyyy',
      showMaskOnHover: false
    }
  })
});
