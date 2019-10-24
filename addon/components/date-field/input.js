import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import { computed } from '@ember/object';
import OneWayDateMask from 'ember-inputmask/components/one-way-date-mask';

@classic
@attributeBindings('type', '_value:value', 'required')
export default class Input extends OneWayDateMask {
  @computed
  get options() {
    return {
      inputFormat: 'mm/dd/yyyy',
      showMaskOnHover: false
    }
  }
}
