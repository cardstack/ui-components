import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | phone-number-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders component', async function(assert) {
    await render(hbs`<PhoneNumberField @label="Enter your phone number" />`);

    assert.dom('[data-test-cs-component="phone-number"]').exists();
    assert.dom('[data-test-cs-component-label="phone-number"] .label').hasText('Enter your phone number');
    assert.dom('[data-test-cs-component="phone-number"] input').hasAttribute('type', 'tel');
    await waitFor('[data-test-cs-component="phone-number"] [aria-owns="country-listbox"]');
    assert.dom('[data-test-cs-component="phone-number"] [aria-owns="country-listbox"]').hasAttribute('title', 'United States: +1');
    assert.dom('[data-test-cs-component-validation="phone-number"]').hasText('');
    assert.dom('[data-test-cs-component-validation="phone-number"]').hasClass('hidden');
  });

  test('it validates phone numbers', async function(assert) {
    await render(hbs`<PhoneNumberField @label="Enter your phone number" />`);
    await fillIn('[data-test-cs-component="phone-number"] input', '510-223-232');

    assert.dom('[data-test-cs-component-validation="phone-number"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="phone-number"]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-validation="phone-number"]').containsText('Please enter a valid phone number')

    await fillIn('[data-test-cs-component="phone-number"] input', '510-223-2322');

    assert.dom('[data-test-cs-component-validation="phone-number"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="phone-number"]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-validation="phone-number"]').hasText('Thank you.');
  });

  test('it renders themed component', async function (assert) {
    await render(hbs`<PhoneNumberField @label="Enter your phone number" @theme="cs-theme" />`);

    assert.dom('[data-test-cs-component="phone-number"] input').hasClass('cs-theme');
    assert.dom('[data-test-cs-component-label="phone-number"]').hasClass('cs-theme');
    assert.dom('[data-test-cs-component-validation="phone-number"]').hasClass('cs-theme');
  });
});
