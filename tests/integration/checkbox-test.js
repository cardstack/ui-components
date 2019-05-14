import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('component can be checked', async function(assert) {
    await render(hbs`<Checkbox @label="By clicking Submit you agree to the Cardstack Terms and Conditions™" />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isChecked();
  });

  test('component can be disabled', async function(assert) {
    await render(hbs`<Checkbox @label="You cannot click me" @disabled={{true}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
  });

  test('component can default to checked', async function(assert) {
    await render(hbs`<Checkbox @label="Yes I would like to receive your newsletter" @checked={{true}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isChecked();

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
  });

  test('component can set value', async function(assert) {
    this.value = 'foo';
    await render(hbs`<Checkbox @label="Click here" @value={{value}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
    assert.dom('.cs-component-checkbox input[type="checkbox"]').hasValue('foo');
  });

  test('component can be required', async function(assert) {
    await render(hbs`<Checkbox @label="By clicking Submit you agree to the Cardstack Terms and Conditions™" @required={{true}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
    assert.dom('.cs-component-checkbox input[type="checkbox"]').hasClass('required');

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isChecked();
    assert.dom('[data-test-cs-component-checkbox-validation]').hasText('Thank you.');

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
    assert.dom('[data-test-cs-component-checkbox-validation]').hasText('You must check this box!');
  });
});