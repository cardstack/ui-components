import Component from '@ember/component';
import layout from '../templates/components/dropdown';
import calculatePosition from 'ember-basic-dropdown/utils/calculate-position';

export default Component.extend({
  layout,
  classNames: 'cs-component-dropdown',
  selected: null,
  multiple: false,
  labelText: 'Select an option',

  calculatePosition(trigger) {
    let position = calculatePosition(...arguments);
    let { left, width, top } = position.style;
    left -= 1;
    width += 2;

    if (!trigger.classList.contains('ember-power-select-multiple-trigger')) {
      top -= 32;
      position.style.top = top;
    }
    position.style.left = left;
    position.style.width = width;

    return position;
  }
});
