import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | checkbox', function(hooks) {
  setupRenderingTest(hooks);
  
  
  test('component can be checked', async function(assert) {
    assert.expect(3)
    this.set('setChecked', function(val) {
      assert.equal(val, true)
    });
    
    await render(hbs`<Checkbox @label="By clicking Submit you agree to the Cardstack Terms and Conditions™" @setChecked={{fn this.setChecked}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isChecked();
  });

  test('component can be disabled', async function(assert) {
    assert.expect(2)

    this.set('setChecked', function(val) {
      // this should not run, which is why we expect(2)
      assert.equal(val, undefined)
    });

    await render(hbs`<Checkbox @label="You cannot click me" @disabled={{true}} @setChecked={{fn this.setChecked "checked"}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
  });

  test('component can default to checked', async function(assert) {
    assert.expect(3)

    this.set('setChecked', function(val) {
      assert.equal(val, false)
    });

    await render(hbs`<Checkbox @label="Yes I would like to receive your newsletter" @checked={{true}} @setChecked={{fn this.setChecked}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isChecked();

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
  });

  test('component can set value', async function(assert) {
    this.set('setChecked', function() {});

    this.value = 'foo';
    await render(hbs`<Checkbox @label="Click here" @value={{value}} @setChecked={{fn this.setChecked}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
    assert.dom('.cs-component-checkbox input[type="checkbox"]').hasValue('foo');
  });

  test('component can be required', async function(assert) {
    this.set('setChecked', function() {});

    await render(hbs`<Checkbox @label="By clicking Submit you agree to the Cardstack Terms and Conditions™" @required={{true}} @setChecked={{fn this.setChecked}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
    assert.dom('.cs-component-checkbox input[type="checkbox"]').hasClass('required');

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isChecked();
    assert.dom('[data-test-cs-component-checkbox-validation]').hasText('Thank you.');

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isNotChecked();
    assert.dom('[data-test-cs-component-checkbox-validation]').hasText('You must check this box!');
  });

  test('component can be disabled', async function(assert) {
    this.set('setChecked', function() {});

    await render(hbs`<Checkbox @label="I would like to sign up for your newsletter" @checked={{true}} @disabled={{true}} @setChecked={{fn this.setChecked}} />`);

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isChecked();
    assert.dom('.cs-component-checkbox input[type="checkbox"]').hasAttribute('disabled');

    await click('.cs-component-checkbox--label');

    assert.dom('.cs-component-checkbox input[type="checkbox"]').isChecked();
  });
});