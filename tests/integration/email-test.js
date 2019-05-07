import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | email', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders optional component', async function(assert) {
    await render(hbs`<Email @label="Enter Email" />`);

    assert.dom('[data-test-cs-component-email]').exists();
    assert.dom('[data-test-cs-component-email-optional]').hasText('Optional');
    assert.dom('[data-test-cs-component-email] input').doesNotHaveClass('required');
    assert.dom('[data-test-cs-component-email] label').hasText('Enter Email');
    assert.dom('[data-test-cs-component-email-validation]').hasText('');
    assert.dom('[data-test-cs-component-email-validation]').hasClass('hidden');
  });

  test('it renders required component', async function (assert) {
    await render(hbs`<Email @label="Enter Email" @required=true />`);

    assert.dom('[data-test-cs-component-email]').exists();
    assert.dom('[data-test-cs-component-email] input').hasClass('required');
    assert.dom('[data-test-cs-component-email] label').hasText('Enter Email');
    assert.dom('[data-test-cs-component-email-validation]').hasText('');
    assert.dom('[data-test-cs-component-email-validation]').hasClass('hidden');
  });

  test('it displays error message for invalid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-email] label').doesNotHaveClass('active');
    assert.dom('[data-test-cs-component-email-validation]').hasClass('hidden');
    assert.dom('[data-test-cs-component-email-validation]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-email-validation]').hasText('');

    await fillIn('[data-test-cs-component-email] input', ' username ');

    assert.dom('[data-test-cs-component-email] label').hasClass('active');
    assert.dom('[data-test-cs-component-email-validation]').hasClass('invalid');
    assert.dom('[data-test-cs-component-email-validation]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-email-validation]').containsText('@');
  });

  test('it displays message for valid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-email-validation]').hasClass('hidden');
    assert.dom('[data-test-cs-component-email-validation]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-email-validation]').hasText('');

    await fillIn('[data-test-cs-component-email] input', 'username@cardstack.com');

    assert.dom('[data-test-cs-component-email-validation]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-email-validation]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-email-validation]').hasText('Thank you.');
  });

  test('it only displays message for required field if it is left blank', async function (assert) {
    await render(hbs`<Email />`);
    await fillIn('[data-test-cs-component-email] input', 'username@cardstack.com');
    await fillIn('[data-test-cs-component-email] input', '');

    assert.dom('[data-test-cs-component-email-validation]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-email-validation]').hasClass('hidden');
    assert.dom('[data-test-cs-component-email-validation]').hasText('');

    await render(hbs`<Email @required=true />`);
    await fillIn('[data-test-cs-component-email] input', 'username');
    await fillIn('[data-test-cs-component-email] input', '');

    assert.dom('[data-test-cs-component-email-validation]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-email-validation]').hasClass('invalid');
    assert.dom('[data-test-cs-component-email-validation]').hasText('Please fill out this field.');
  });
});
