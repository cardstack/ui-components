import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it can render the component', async function(assert) {
    this.set('setChecked', function() {});

    await render(hbs`<Checkbox @label="I would like to sign up for your newsletter" @checked={{this.isChecked}} @setChecked={{fn this.setChecked}} />`);

    assert.dom('[data-test-cs-component-input="checkbox"]').isNotChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').isNotDisabled();
    assert.dom('[data-test-cs-component-input="checkbox"]').isNotRequired();
    assert.dom('[data-test-cs-component-validation="checkbox"]').doesNotContainText();
    assert.dom('[data-test-cs-component-validation="checkbox"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-input="checkbox"]').doesNotHaveClass('checked');
    assert.dom('[data-test-cs-component-input="checkbox"]').doesNotHaveClass('disabled');
    assert.dom('[data-test-cs-component-input="checkbox"]').doesNotHaveClass('invalid');
  });

  test('component can be checked', async function(assert) {
    assert.expect(5)

    let obj = { isChecked: false };
    this.isChecked = obj.isChecked;

    this.setChecked = function(prop, val) {
      assert.equal(obj[prop], false);

      obj[prop] = val;
      assert.equal(obj[prop], true);
    };

    await render(hbs`<Checkbox @label="By clicking Submit you agree to the Cardstack Terms and Conditions™" @checked={{this.isChecked}} @setChecked={{fn this.setChecked "isChecked"}} />`);

    assert.dom('[data-test-cs-component-input="checkbox"]').isNotChecked();

    await click('[data-test-cs-component-label="checkbox"]');

    assert.dom('[data-test-cs-component-input="checkbox"]').isChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('checked');
  });

  test('component can default to checked', async function(assert) {
    assert.expect(6)

    let obj = { isChecked: true };
    this.isChecked = obj.isChecked;

    this.setChecked = function(prop, val) {
      assert.equal(obj[prop], true);

      obj[prop] = val;
      assert.equal(obj[prop], false);
    };

    await render(hbs`<Checkbox @label="Yes I would like to receive your newsletter" @checked={{this.isChecked}} @setChecked={{fn this.setChecked "isChecked"}} />`);

    assert.dom('[data-test-cs-component-input="checkbox"]').isChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('checked');

    await click('[data-test-cs-component-label="checkbox"]');

    assert.dom('[data-test-cs-component-input="checkbox"]').isNotChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').doesNotHaveClass('checked');
  });

  test('it can render the required component', async function(assert) {
    this.set('setChecked', function() {});

    await render(hbs`<Checkbox @label="By clicking Submit you agree to the Cardstack Terms and Conditions™" @required={{true}} @checked={{this.isChecked}} @setChecked={{fn this.setChecked}} />`);

    assert.dom('[data-test-cs-component-input="checkbox"]').isRequired();
    assert.dom('[data-test-cs-component-input="checkbox"]').isNotChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').isNotDisabled();
    assert.dom('[data-test-cs-component-validation="checkbox"]').doesNotContainText();
  });

  test('it can display error message if required component is not checked', async function(assert) {
    this.set('setChecked', function() {});

    await render(hbs`<Checkbox @label="By clicking Submit you agree to the Cardstack Terms and Conditions™" @required={{true}} @setChecked={{fn this.setChecked}} />`);

    assert.dom('[data-test-cs-component-input="checkbox"]').isRequired();
    assert.dom('[data-test-cs-component-validation="checkbox"]').doesNotContainText();

    await click('[data-test-cs-component-input="checkbox"]');

    assert.dom('[data-test-cs-component-input="checkbox"]').isChecked();
    assert.dom('[data-test-cs-component-validation="checkbox"]').doesNotContainText();

    await click('[data-test-cs-component-input="checkbox"]');

    assert.dom('[data-test-cs-component-input="checkbox"]').isNotChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="checkbox"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="checkbox"]').hasText('This field is required');
  });

  test('it can clear error message when required component is checked', async function(assert) {
    this.set('setChecked', function() {});

    await render(hbs`<Checkbox @label="By clicking Submit you agree to the Cardstack Terms and Conditions™" @required={{true}} @checked={{true}} @setChecked={{fn this.setChecked}} />`);

    assert.dom('[data-test-cs-component-input="checkbox"]').isRequired();
    assert.dom('[data-test-cs-component-input="checkbox"]').isChecked();
    assert.dom('[data-test-cs-component-validation="checkbox"]').doesNotContainText();

    await click('[data-test-cs-component-input="checkbox"]');

    assert.dom('[data-test-cs-component-input="checkbox"]').isNotChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="checkbox"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="checkbox"]').hasText('This field is required');

    await click('[data-test-cs-component-input="checkbox"]');

    assert.dom('[data-test-cs-component-input="checkbox"]').isRequired();
    assert.dom('[data-test-cs-component-input="checkbox"]').isChecked();
    assert.dom('[data-test-cs-component-validation="checkbox"]').doesNotContainText();
  });

  test('unchecked component can be disabled', async function(assert) {
    assert.expect(8)

    this.set('setChecked', function(val) {
      // this should not run, which is why we expect(8)
      assert.equal(val, undefined)
    });

    await render(hbs`<Checkbox @label="You cannot click me" @disabled={{true}} @setValue={{fn this.setChecked "checked"}} />`);

    assert.dom('[data-test-cs-component-input="checkbox"]').isNotChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').isDisabled();
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('disabled');
    assert.dom('[data-test-cs-component-input="checkbox"]').doesNotHaveClass('checked');

    await click('[data-test-cs-component-input="checkbox"]');

    assert.dom('[data-test-cs-component-input="checkbox"]').isNotChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').isDisabled();
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('disabled');
    assert.dom('[data-test-cs-component-input="checkbox"]').doesNotHaveClass('checked');
  });

  test('checked component can be disabled', async function(assert) {
    assert.expect(8)

    this.set('setChecked', function(val) {
      // this should not run, which is why we expect(8)
      assert.equal(val, undefined)
    });

    await render(hbs`<Checkbox @label="I would like to sign up for your newsletter" @checked={{true}} @disabled={{true}} @setValue={{fn this.setChecked}} />`);

    assert.dom('[data-test-cs-component-input="checkbox"]').isChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').isDisabled();
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('disabled');
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('checked');

    await click('[data-test-cs-component-input="checkbox"]');

    assert.dom('[data-test-cs-component-input="checkbox"]').isChecked();
    assert.dom('[data-test-cs-component-input="checkbox"]').isDisabled();
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('disabled');
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('checked');
  });

  test('it can render the themed component', async function(assert) {
    this.set('setChecked', function() {});

    await render(hbs`<Checkbox @theme="cs-dark" @label="I would like to sign up for your newsletter" @setChecked={{fn this.setChecked}} />`);

    assert.dom('[data-test-cs-component="checkbox"]').hasClass('cs-dark-checkbox-group');
    assert.dom('[data-test-cs-component-input="checkbox"]').hasClass('cs-dark-checkbox');
  });
});

