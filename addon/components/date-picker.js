import BaseComponent from './base-component';
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

export default class DatePicker extends BaseComponent {
  @tracked yearRange = DEFAULT_YEAR_RANGE;
  @tracked startYear = DEFAULT_YEAR;
  @tracked selected;
  @tracked value = '';
  @tracked errorMessage = '';
  @tracked required = false;
  @tracked center;
  className= "cs-component-date-picker";
  dataTestName = 'date-picker';
  type = 'date';
  fieldType = 'text';
  label = 'Enter a Date';

  months = MONTHS;

  @match('value', DATE_REGEX)
  isValidDate;

  @not('isValidDate')
  invalid;


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
    if (this.args.setValue) {
      this.args.setValue(date);
    }
  }

  @action
  handleInput({ target: { value } }) {
    let errorMessage = `Please enter a valid date in the format MM/DD/YYYY
                        or select one from the calendar.`;

    this.value = value;

    if (!value && !this.required) {
      this.selected = '';
      this.center = moment();
      this.errorMessage = '';
    } else if (!value && this.required) {
      this.selected = '';
      this.center = moment();
      this.errorMessage = 'This field is required.';
    } else if (this.invalid) {
      this.selected = '';
      this.center = moment();
      this.errorMessage = errorMessage;
    } else if (this.isValidDate) {
      value = moment(value, 'MM/DD/YYYY');
      this.center = value;
      this.selected = value;
      this.errorMessage = '';
    }

    if (value && !this.errorMessage && this.args.setValue) {
      this.args.setValue(moment(value).format('MM/DD/YYYY'));
    }

    return this.errorMessage;
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
