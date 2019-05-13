import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | email', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders optional component', async function(assert) {
    await render(hbs`<Email @label="Enter Email" />`);

    assert.dom('[data-test-cs-component-text-field]').exists();
    assert.dom('[data-test-cs-component-text-field-optional]').hasText('Optional');
    assert.dom('[data-test-cs-component-text-field] input').doesNotHaveClass('required');
    assert.dom('[data-test-cs-component-text-field] label').hasText('Enter Email');
    assert.dom('[data-test-cs-component-text-field-validation]').hasText('');
    assert.dom('[data-test-cs-component-text-field-validation]').hasClass('hidden');
  });

  test('it renders required component', async function (assert) {
    await render(hbs`<Email @label="Enter Email" @required=true />`);

    assert.dom('[data-test-cs-component-text-field]').exists();
    assert.dom('[data-test-cs-component-text-field] input').hasClass('required');
    assert.dom('[data-test-cs-component-text-field] label').hasText('Enter Email');
    assert.dom('[data-test-cs-component-text-field-validation]').hasText('');
    assert.dom('[data-test-cs-component-text-field-validation]').hasClass('hidden');
  });

  test('it displays error message for invalid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-text-field] label').doesNotHaveClass('active');
    assert.dom('[data-test-cs-component-text-field-validation]').hasClass('hidden');
    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-text-field-validation]').hasText('');

    await fillIn('[data-test-cs-component-text-field] input', ' username ');

    assert.dom('[data-test-cs-component-text-field] label').hasClass('active');
    assert.dom('[data-test-cs-component-text-field-validation]').hasClass('invalid');
    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-text-field-validation]').containsText('@');
  });

  test('it displays message for valid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-text-field-validation]').hasClass('hidden');
    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-text-field-validation]').hasText('');

    await fillIn('[data-test-cs-component-text-field] input', 'username@cardstack.com');

    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-text-field-validation]').hasText('Thank you.');
  });

  test('it only displays message for required field if it is left blank', async function (assert) {
    await render(hbs`<Email />`);
    await fillIn('[data-test-cs-component-text-field] input', 'username@cardstack.com');
    await fillIn('[data-test-cs-component-text-field] input', '');

    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-text-field-validation]').hasClass('hidden');
    assert.dom('[data-test-cs-component-text-field-validation]').hasText('');

    await render(hbs`<Email @required=true />`);
    await fillIn('[data-test-cs-component-text-field] input', 'username');
    await fillIn('[data-test-cs-component-text-field] input', '');

    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-text-field-validation]').hasClass('invalid');
    assert.dom('[data-test-cs-component-text-field-validation]').hasText('Please fill out this field.');
  });
});
