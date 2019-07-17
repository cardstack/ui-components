import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { clickTrigger } from 'ember-power-select/test-support/helpers'
import moment from 'moment';

module('Integration | Component | date picker', function (hooks) {
  let errorMessage = 'Please enter a valid date in the format MM/DD/YYYY or select one from the calendar.';
  let month = moment().format('MMMM');
  let year = moment().format('YYYY');

  setupRenderingTest(hooks);

  test('it renders default component', async function (assert) {
    await render(hbs`<DatePicker @label="Pick a date" />`);

    assert.dom('[data-test-cs-component-date]').exists();
    assert.dom('[data-test-cs-component-label="date-picker"] .label').hasText('Pick a date');
    assert.dom('.cs-component-calendar').doesNotExist();
    assert.dom('[data-test-cs-component-validation="date-picker"]').doesNotContainText();
  });

  test('it renders required component', async function (assert) {
    await render(hbs`<DatePicker @required="true" />`);

    assert.dom('[data-test-cs-component-input="date-picker"][required]').exists();
    assert.dom('[data-test-cs-component-validation="date-picker"]').doesNotContainText();
  });

  test('it renders disabled component', async function (assert) {
    await render(hbs`<DatePicker @disabled="true" />`);

    assert.dom('[data-test-cs-component-input="date-picker"][disabled]').exists();
  });

  test('it renders component with custom years', async function (assert) {
    await render(hbs`<DatePicker @startYear="2019" @yearRange="10" />`);

    assert.dom('[data-test-cs-component-date]').exists();

    await click('[data-test-cs-component-input="date-picker"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-years]');

    assert.dom('[data-option-index="0"]').hasText('2019');
    assert.dom('[data-option-index="10"]').hasText('2029');
    assert.dom('[data-option-index="11"]').doesNotExist();
  });

  test('it displays calendar with current month and year when clicking on date input', async function (assert) {
    await render(hbs`<DatePicker />`);
    await click('[data-test-cs-component-input="date-picker"]');

    assert.dom('.cs-component-calendar').exists();
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText(month);
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText(year);
    assert.dom('[data-test-cs-component-input="date-picker"]').hasValue('');
  });

  test('it can select date using calendar view', async function (assert) {
    await render(hbs`<DatePicker />`);
    await click('[data-test-cs-component-input="date-picker"]');

    await clickTrigger('[data-test-cs-component-calendar-nav-months]');
    await click('[data-option-index="3"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-years]');
    await click('[data-option-index="70"]');
    await click('[data-date="1990-04-10"]');

    assert.dom('.cs-component-calendar').doesNotExist();
    assert.dom('[data-test-cs-component-input="date-picker"]').hasValue('04/10/1990');
  });

  test('it can select date using input field', async function (assert) {
    await render(hbs`<DatePicker />`);
    await fillIn('[data-test-cs-component-input="date-picker"]', '12/07/2018');
    await click('[data-test-cs-component-input="date-picker"]');

    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText('December');
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText('2018');
    assert.dom('.ember-power-calendar-day--selected').hasText('7');
  });

  test('it can change selected date', async function (assert) {
    await render(hbs`<DatePicker />`);
    await click('[data-test-cs-component-input="date-picker"]');

    await clickTrigger('[data-test-cs-component-calendar-nav-months]');
    await click('[data-option-index="3"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-years]');
    await click('[data-option-index="70"]');
    await click('[data-date="1990-04-10"]');

    assert.dom('[data-test-cs-component-input="date-picker"]').hasValue('04/10/1990');

    await click('[data-test-cs-component-input="date-picker"]');
    assert.dom('[data-date="1990-04-10"].ember-power-calendar-day--selected').hasText('10');

    await click('[data-date="1990-04-28"]');
    assert.dom('[data-test-cs-component-input="date-picker"]').hasValue('04/28/1990');

    await fillIn('[data-test-cs-component-input="date-picker"]', '02/01/2018');
    await triggerKeyEvent('input', 'keydown', 'Enter');

    assert.dom('[data-test-cs-component-input="date-picker"]').hasValue('02/01/2018');
    assert.dom('[data-date="2018-02-01"].ember-power-calendar-day--selected').hasText('1');
  });

  test('it can clear selected date and reset calendar', async function (assert) {
    await render(hbs`<DatePicker @label="Enter date" />`);
    await click('[data-test-cs-component-input="date-picker"]');

    await fillIn('[data-test-cs-component-input="date-picker"]', '02/01/2018');
    await triggerKeyEvent('input', 'keydown', 'Enter');

    assert.dom('[data-test-cs-component-input="date-picker"]').hasValue('02/01/2018');

    await fillIn('[data-test-cs-component-input="date-picker"]', '');
    await triggerKeyEvent('input', 'keydown', 'Enter');

    assert.dom('[data-test-cs-component-input="date-picker"]').hasValue('');
    assert.dom('[data-test-cs-component-label="date-picker"] .label').hasText('Enter date');
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText(month);
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText(year);
    assert.dom('.ember-power-calendar-day--selected').doesNotExist();
  });

  test('it can change calendar view from the dropdown menu', async function (assert) {
    await render(hbs`<DatePicker />`);
    await click('[data-test-cs-component-input="date-picker"]');

    assert.dom('.cs-component-calendar').exists();

    await clickTrigger('[data-test-cs-component-calendar-nav-months]');
    await click('[data-option-index="11"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-years]');
    await click('[data-option-index="100"]');

    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText('December');
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText('2020');
    assert.dom('.ember-power-calendar-day--current-month').exists({ count: 31 });

    await clickTrigger('[data-test-cs-component-calendar-nav-months]');
    await click('[data-option-index="1"]');

    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText('February');
    assert.dom('.ember-power-calendar-day--current-month').exists({ count: 29 });

    await clickTrigger('[data-test-cs-component-calendar-nav-years]');
    await click('[data-option-index="94"]');

    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText('2014');
    assert.dom('.ember-power-calendar-day--current-month').exists({ count: 28 });
  });

  test('it can change calendar view using navigation arrows', async function (assert) {
    await render(hbs`<DatePicker />`);
    await click('[data-test-cs-component-input="date-picker"]');
    assert.dom('.cs-component-calendar').exists();

    await click('[data-test-nav-arrow="year-backwards"]');
    await click('[data-test-nav-arrow="year-backwards"]');
    year = moment(year, 'YYYY').subtract(2, 'y').format('YYYY');
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText(month);
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText(year);

    await click('[data-test-nav-arrow="month-forwards"]');
    month = moment(month, 'MMMM').add(1, 'M').format('MMMM');
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText(month);
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText(year);

    await click('[data-test-nav-arrow="year-forwards"]');
    year = moment(year, 'YYYY').add(1, 'y').format('YYYY');
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText(month);
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText(year);

    await click('[data-test-nav-arrow="month-backwards"]');
    await click('[data-test-nav-arrow="month-backwards"]');
    month = moment(month, 'MMMM').subtract(2, 'M').format('MMMM');
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText(month);
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText(year);
  });

  test('it can change calendar view using both dropdown and navigation arrows', async function (assert) {
    await render(hbs`<DatePicker />`);
    await click('[data-test-cs-component-input="date-picker"]');
    assert.dom('.cs-component-calendar').exists();

    await clickTrigger('[data-test-cs-component-calendar-nav-months]');
    await click('[data-option-index="0"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-years]');
    await click('[data-option-index="100"]');
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText('January');
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText('2020');

    await click('[data-test-nav-arrow="month-backwards"]');
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText('December');
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText('2019');

    await click('[data-test-nav-arrow="year-forwards"]');
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText('December');
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText('2020');
    assert.dom('.ember-power-calendar-day--current-month').exists({ count: 31 });

    await click('[data-test-nav-arrow="month-forwards"]'); // January 2021
    await click('[data-test-nav-arrow="month-forwards"]'); // February 2021
    await click('[data-test-nav-arrow="year-backwards"]');
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText('February');
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText('2020');
    assert.dom('.ember-power-calendar-day--current-month').exists({ count: 29 });
  });

  test('it displays error message for invalid input', async function (assert) {
    await render(hbs`<DatePicker />`);

    await fillIn('[data-test-cs-component-input="date-picker"]', '111');
    assert.dom('[data-test-cs-component-validation="date-picker"]').hasText(errorMessage);

    await fillIn('[data-test-cs-component-input="date-picker"]', '11/11/2019');
    assert.dom('[data-test-cs-component-validation="date-picker"]').doesNotContainText();
  });

  test('it displays error message for required field left blank', async function (assert) {
    let requiredErrorMessage = 'This field is required.';

    await render(hbs`<DatePicker @required="true" />`);

    await fillIn('[data-test-cs-component-input="date-picker"]', '');
    assert.dom('[data-test-cs-component-validation="date-picker"]').hasText(requiredErrorMessage);

    await click('[data-test-cs-component-input="date-picker"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-months]');
    await click('[data-option-index="0"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-years]');
    await click('[data-option-index="100"]');
    await click('[data-date="2020-01-10"]');

    assert.dom('[data-test-cs-component-input="date-picker"]').hasValue('01/10/2020');
    assert.dom('[data-test-cs-component-validation="date-picker"]').doesNotContainText();

    await fillIn('[data-test-cs-component-input="date-picker"]', '');
    assert.dom('[data-test-cs-component-validation="date-picker"]').hasText(requiredErrorMessage);
  });

  test('it does not display error message for valid input', async function (assert) {
    await render(hbs`<DatePicker />`);

    await fillIn('[data-test-cs-component-input="date-picker"]', '02/03/2017');
    assert.dom('[data-test-cs-component-validation="date-picker"]').doesNotContainText();

    await click('[data-test-cs-component-input="date-picker"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-months]');
    await click('[data-option-index="0"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-years]');
    await click('[data-option-index="100"]');
    await click('[data-date="2020-01-10"]');

    assert.dom('[data-test-cs-component-input="date-picker"]').hasValue('01/10/2020');
    assert.dom('[data-test-cs-component-validation="date-picker"]').doesNotContainText();
  });

  test('it does not display error message for optional input left blank', async function (assert) {
    await render(hbs`<DatePicker />`);

    await fillIn('[data-test-cs-component-input="date-picker"]', '');
    assert.dom('[data-test-cs-component-validation="date-picker"]').doesNotContainText();
  });

  test('it renders themed component', async function (assert) {
    await render(hbs`<DatePicker @label="Pick a date" @theme="cs-theme" />`);

    assert.dom('[data-test-cs-component-date]').hasClass('cs-theme');
    assert.dom('[data-test-cs-component-input="date-picker"]').hasClass('cs-theme');
    assert.dom('[data-test-cs-component-label="date-picker"]').hasClass('cs-theme');
    assert.dom('[data-test-cs-component-validation="date-picker"]').hasClass('cs-theme');
  });
});
