import OneWayPhoneMask from 'ember-inputmask/components/one-way-phone-mask';

export default OneWayPhoneMask.extend({
  attributeBindings: [
    'type',
    '_value:value',
    'required'
  ],
  options: {
    showMaskOnHover: false
  }
});
