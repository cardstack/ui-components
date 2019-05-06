import OneWayPhoneMask from 'ember-inputmask/components/one-way-phone-mask';
// import layout from '../../templates/components/phone-number-field/input';

export default OneWayPhoneMask.extend({
  // layout
  attributeBindings: [
    'type',
    '_value:value',
    'required'
  ],
  options: {
    showMaskOnHover: false
  }
});
