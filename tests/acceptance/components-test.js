import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { selectChoose, typeInSearch, clickTrigger } from 'ember-power-select/test-support/helpers'
import moment from 'moment';

module('Acceptance | components', function(hooks) {
  setupApplicationTest(hooks);

  test('components visual check', async function(assert) {
    await visit('/freestyle');
    assert.equal(currentURL(), '/freestyle');

    percySnapshot('UI Components');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });

  test('single selection component', async function(assert) {
    await visit('/freestyle');
    assert.equal(currentURL(), '/freestyle');

    assert.dom('.cs-component-choose-one--label').exists({ count: 4 });

    await click('[data-test-choice-value="red"]');

    assert.dom('.cs-component-choose-one--label.checked').exists({ count: 1 });
    assert.dom('.cs-component-choose-one--label.checked').hasText('Red');

    await click('[data-test-choice-value="blue"]');

    assert.dom('.cs-component-choose-one--label.checked').exists({ count: 1 });
    assert.dom('.cs-component-choose-one--label.checked').hasText('Blue');
  });

  test('multiple selection component', async function(assert) {
    await visit('/freestyle');
    assert.equal(currentURL(), '/freestyle');

    assert.dom('.cs-component-choose-many--label').exists({ count: 4 });
    assert.dom('.cs-component-choose-many--label.checked').doesNotExist();

    await click('.cs-component-choose-many--label [data-test-choice-value="red"]');

    assert.dom('.cs-component-choose-many--label.checked').exists({ count: 1 });
    assert.dom('.cs-component-choose-many--label.checked').hasText('Red');

    await click('.cs-component-choose-many--label [data-test-choice-value="blue"]');

    assert.dom('.cs-component-choose-many--label.checked').exists({ count: 2 });
    assert.dom('.cs-component-choose-many--label.checked [data-test-choice-value="blue"]').hasText('Blue');
  });

  test('single select dropdown component', async function(assert) {
    await visit('/freestyle');

    assert.dom('.cs-component-dropdown').exists();
    assert.dom('.cs-component-dropdown label').hasText('Select a country');

    await selectChoose('.cs-component-dropdown', 'Brazil');
    assert.dom('.ember-power-select-selected-item').hasText('Brazil');

    await clickTrigger('.cs-component-dropdown');
    await typeInSearch('Lat');

    assert.dom('.ember-power-select-option').exists({ count: 1 });

    await click('.ember-power-select-option');
    assert.dom('.ember-power-select-selected-item').hasText('Latvia');
  });

  test('multi select dropdown component', async function(assert) {
    await visit('/freestyle?s=dropdown');

    await click(".FreestyleCollection-variantListItem");

    assert.dom('.cs-component-dropdown--multiple').exists();
    assert.dom('.cs-component-dropdown--multiple label').hasText('Select a country');

    await selectChoose('.cs-component-dropdown--multiple', 'Brazil');
    assert.dom('.ember-power-select-multiple-option').hasText(/Brazil/);

    await clickTrigger('.cs-component-dropdown--multiple');
    await typeInSearch('Lat');

    assert.dom('.ember-power-select-option').exists({ count: 1 });

    await click('.ember-power-select-option');
    assert.dom('.ember-power-select-multiple-option').exists({ count: 2 });
  });

  test('cta button component', async function(assert) {
    await visit('/freestyle?=cta');
    assert.equal(currentURL(), '/freestyle?=cta');

    assert.dom('[data-test-cs-component-cta="primary"]').exists();
    assert.dom('[data-test-cs-component-cta="secondary"]').exists();
    assert.dom('[data-test-cs-component-cta="primary"]:disabled').exists();
    assert.dom('[data-test-cs-component-cta="secondary"]:disabled').exists();
  });

  test('email component', async function(assert) {
    await visit('/freestyle');
    assert.equal(currentURL(), '/freestyle');

    assert.dom('[data-test-cs-component-email]').exists({ count: 2 });
    assert.dom('[data-test-cs-component-email] input[required]').exists({ count: 1 });
    assert.dom('[data-test-cs-component-email] [data-test-cs-component-text-field-optional]').exists({ count: 1 });
    assert.dom('[data-test-cs-component-email] [data-test-cs-component-text-field-optional]').hasText('Optional');
    assert.dom('[data-test-cs-component-email] label').hasText('Email Address');
    assert.dom('[data-test-cs-component-email] [data-test-cs-component-text-field-validation]').hasText('');
    assert.dom('[data-test-cs-component-email] [data-test-cs-component-text-field-validation].hidden').exists({ count: 2 });
  });

  test('date picker component', async function(assert) {
    let month = moment().format('MMMM');
    let year = moment().format('YYYY');

    await visit('/freestyle?s=date-picker');
    assert.equal(currentURL(), '/freestyle?s=date-picker');

    assert.dom('[data-test-cs-component-date]').exists({ count: 3 });
    assert.dom('[data-test-cs-component-date] input[required]').exists({ count: 1 });
    assert.dom('[data-test-cs-component-date] label').hasText('Date (MM/DD/YYYY)');
    assert.dom('.cs-component-calendar').doesNotExist();

    await click('[data-test-cs-component-date] input');

    assert.dom('.cs-component-calendar').exists();
    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText(month);
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText(year);
    assert.dom('.ember-power-calendar-day--selected').doesNotExist();

    await clickTrigger('[data-test-cs-component-calendar-nav-months]');
    await click('[data-option-index="1"]');
    await clickTrigger('[data-test-cs-component-calendar-nav-years]');
    await click('[data-option-index="97"]');

    assert.dom('[data-test-cs-component-calendar-nav-months]').hasText('February');
    assert.dom('[data-test-cs-component-calendar-nav-years]').hasText('2017');

    await click('[data-date="2017-02-07"]');

    assert.dom('.cs-component-calendar').doesNotExist();
    assert.dom('[data-test-cs-component-date] input').hasValue('02/07/2017');

    await fillIn('[data-test-cs-component-date] input', '4/10/1990');
    await click('[data-test-cs-component-date] input');

    assert.dom('[data-date="1990-04-10"].ember-power-calendar-day--selected').exists();
  });
});
