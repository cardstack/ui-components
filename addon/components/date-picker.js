import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { not, match } from '@ember/object/computed';
import moment from 'moment';

const DEFAULT_YEAR = 1920;
const DEFAULT_YEAR_RANGE = 150;

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

function setYears(range, startYear) {
  // Adding 1 to range to account for current year.
  return Array(...Array(range + 1)).map((_, i) => `${i + startYear}`);
}

// Valid for years since 1900. Includes leap years. MM and DD can be 1 or 2 digits.
const DATE_REGEX = /^(((0?[1-9]|1[012])\/(0?[1-9]|1\d|2[0-8])|(0?[13456789]|1[012])\/(29|30)|(0?[13578]|1[02])\/31)\/(19|[2-9]\d)\d{2}|0?2\/29\/((19|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([2468][048]|[3579][26])00)))$/;

export default class DatePicker extends Component {
  @tracked yearRange = DEFAULT_YEAR_RANGE;
  @tracked startYear = DEFAULT_YEAR;
  @tracked selected;
  @tracked inputValue = '';

  months = MONTHS;
  required = false;
  errorMessage = '';

  @match('inputValue', DATE_REGEX)
  isValidDate;

  @not('isValidDate')
  invalid;

  get years() {
    return setYears(this.yearRange*1, this.startYear*1);
  }

  get selectedDate() {
    if (!this.selected) { return ''; }

    let date = moment(this.selected).format('MM/DD/YYYY');
    this.updateInputValue(date);
    return date;
  }

  updateInputValue(date) {
    this.set('inputValue', date);
    this.set('errorMessage', '');
  }

  @action
  handleInput(ev) {
    let value = ev.target.value;
    let errorMessage = `Please enter a valid date in the format MM/DD/YYYY
                        or select one from the calendar.`;

    this.set('inputValue', value);

    if (!value && !this.required) {
      this.set('selected', '');
      this.set('center', moment());
      return this.set('errorMessage', '');
    }

    if (!value && this.required) {
      this.set('selected', '');
      this.set('center', moment());
      return this.set('errorMessage', 'This field is required.');
    }

    if (this.invalid) {
      this.set('selected', '');
      this.set('center', moment());
      return this.set('errorMessage', errorMessage);
    }

    if (this.isValidDate) {
      value = moment(value, 'MM/DD/YYYY');
      this.set('center', value);
      this.set('selected', value);
      return this.set('errorMessage', '');
    }
  }

  @action
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
