import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | email', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders optional component', async function(assert) {
    await render(hbs`<Email @label="Enter Email" />`);

    assert.dom('[data-test-cs-component="email"]').exists();
    assert.dom('[data-test-cs-component-input="email"]').doesNotHaveAttribute('required');
    assert.dom('[data-test-cs-component-label="email"] .optional').hasText('Optional');
    assert.dom('[data-test-cs-component-label="email"] .label').hasText('Enter Email');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');
    assert.dom('[data-test-cs-component-validation="email"]').hasClass('hidden');
  });

  test('it renders required component', async function (assert) {
    await render(hbs`<Email @label="Enter Email" @required="true" />`);

    assert.dom('[data-test-cs-component="email"]').exists();
    assert.dom('[data-test-cs-component-input="email"]').hasAttribute('required');
    assert.dom('[data-test-cs-component-label="email"] .label').hasText('Enter Email');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');
    assert.dom('[data-test-cs-component-validation="email"]').hasClass('hidden');
  });

  test('it displays error message for invalid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-label="email"]').doesNotHaveClass('active');
    assert.dom('[data-test-cs-component-validation="email"]').hasClass('hidden');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');

    await fillIn('[data-test-cs-component-input="email"]', 'username');

    assert.dom('[data-test-cs-component-label="email"]').hasClass('active');
    assert.dom('[data-test-cs-component-validation="email"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('Please enter your email address in the format "address@domain.com"');
  });

  test('it displays validation message for valid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-validation="email"]').hasClass('hidden');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');

    await fillIn('[data-test-cs-component-input="email"]', 'username+2@cardstack.co');

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('Thank you.');
  });

  test('it only displays error message for required field if it is left blank', async function (assert) {
    await render(hbs`<Email />`);
    await fillIn('[data-test-cs-component-input="email"]', '');

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasClass('hidden');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');

    await render(hbs`<Email @required=true />`);
    await fillIn('[data-test-cs-component-input="email"]', '');

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-validation="email"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('This field is required. Please enter your email address.');
  });

  test('it renders themed component', async function (assert) {
    await render(hbs`<Email @theme="cs-theme" />`);

    assert.dom('[data-test-cs-component-input="email"].cs-theme').exists();
    assert.dom('[data-test-cs-component-label="email"].cs-theme').exists();
    assert.dom('[data-test-cs-component-validation="email"].cs-theme').exists();
  });
});
