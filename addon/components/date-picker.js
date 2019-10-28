import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
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
  @tracked value = '';
  @tracked errorMessage = '';
  className= "cs-component-email";
  dataTestName = 'date-picker';
  type = 'date';
  fieldType = 'text';
  label = 'Enter a Date';

  months = MONTHS;
  required = false;

  @match('value', DATE_REGEX)
  isValidDate;

  @not('isValidDate')
  invalid;


  constructor(...args) {
    super(...args);

    // FIXME: we probably don't want to set a property for every attribute, just a select few
    for (let arg of Object.keys(this.args)) {
      // if (ATTRIBUTES_TO_COPY.includes(arg)) {
        set(this, arg, this.args[arg]);
      // }
    }
  }

  get years() {
    return setYears(this.yearRange*1, this.startYear*1);
  }

  get selectedDate() {
    if (!this.selected) { return ''; }

    let date = moment(this.selected).format('MM/DD/YYYY');
    this.updatevalue(date);
    return date;
  }

  updatevalue(date) {
    this.value = date;
    this.errorMessage = '';
  }

  @action
  handleInput(value) {
    console.log('date-picker handleInput value', value);
    let errorMessage = `Please enter a valid date in the format MM/DD/YYYY
                        or select one from the calendar.`;

    this.value = value;

    if (!value && !this.required) {
      this.selected = '';
      this.center = moment();
      return this.errorMessage = '';
    }

    if (!value && this.required) {
      this.selected = '';
      this.center = moment();
      return this.errorMessage = 'This field is required.';
    }

    if (this.invalid) {
      this.selected = '';
      this.center = moment();
      return this.errorMessage = errorMessage;
    }

    if (this.isValidDate) {
      value = moment(value, 'MM/DD/YYYY');
      this.center = value;
      this.selected = value;
      return this.errorMessage = '';
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
