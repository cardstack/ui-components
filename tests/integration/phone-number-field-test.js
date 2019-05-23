import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | phone-number-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders component', async function(assert) {
    await render(hbs`<PhoneNumberField @label="Enter your phone number" />`);

    assert.dom('[data-test-cs-component-phone-number-field]').exists();
    assert.dom('[data-test-cs-component-phone-number-field] label').hasText('Enter your phone number');
    assert.dom('[data-test-cs-component-phone-number-field] input').hasAttribute('type', 'tel');
    await waitFor('[data-test-cs-component-phone-number-field] [aria-owns="country-listbox"]');
    assert.dom('[data-test-cs-component-phone-number-field] [aria-owns="country-listbox"]').hasAttribute('title', 'United States: +1');
    assert.dom('[data-test-cs-component-text-field-validation]').hasText('');
    assert.dom('[data-test-cs-component-text-field-validation]').hasClass('hidden');
  });

  test('it validates phone numbers', async function(assert) {
    await render(hbs`<PhoneNumberField @label="Enter your phone number" />`);
    await fillIn('[data-test-cs-component-phone-number-field] input', '510-223-232');

    assert.dom('[data-test-cs-component-text-field-validation]').hasClass('invalid');
    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-text-field-validation]').containsText('Please enter a valid phone number')

    await fillIn('[data-test-cs-component-phone-number-field] input', '510-223-2322');

    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-text-field-validation]').doesNotHaveClass('hidden');
    assert.dom('[data-test-cs-component-text-field-validation]').hasText('Thank you.');
  });
});