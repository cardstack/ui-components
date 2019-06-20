import OneWayEmailMask from 'ember-inputmask/components/one-way-email-mask';
import { computed } from '@ember/object';

export default OneWayEmailMask.extend({
  options: computed(function() {
    return {
      showMaskOnHover: false
    }
  })
});
