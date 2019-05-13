import Component from '@ember/component';
import layout from '../templates/components/date-picker';
import moment from 'moment';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// TO DO: make this more flexible
const YEARS = Array(...Array(100)).map((_, i) => `${i + 1940}`);

export default Component.extend({
  layout,
  classNames: ['cs-component-date'],
  attributeBindings: ['dataTestName:data-test-cs-component-date'],
  dataTestName: true,
  months: MONTHS,
  years: YEARS,

  actions: {
    changeSelected(ev) {
      let value = ev.target.value;
      value = moment(value, 'MM-DD-YYYY');

      if (!value.toISOString()) {
        // if no value, reset calendar view to current month and year
        value = moment();
        return this.set('center', value);
      }

      this.set('center', value);
      this.set('selected', value);
    },

    changeCenter(unit, calendar, val) {
      if (!val) { return; }

      let value;

      if (unit === 'month') {
        let currentYear = moment(calendar.center).format('YYYY');
        value = moment(`${val} ${currentYear}`, 'MMMM YYYY');
      }

      if (unit === 'year') {
        let currentMonth = moment(calendar.center).format('MMMM');
        value = moment(`${currentMonth} ${val}`, 'MMMM YYYY');
      }

      calendar.actions.changeCenter(value);
    }
  }
});
