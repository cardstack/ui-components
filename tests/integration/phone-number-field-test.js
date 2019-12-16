import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor, waitUntil, fillIn, find } from '@ember/test-helpers';
import { A } from '@ember/array';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | phone-number-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders component', async function(assert) {
    await render(hbs`<PhoneNumberField @label="Enter your phone number" />`);

    assert.dom('[data-test-cs-component="phone-number"].cs-input-group').exists();
    assert.dom('[data-test-cs-component-input="phone-number"].cs-input').exists();
    assert.dom('[data-test-cs-component-label="phone-number"]').hasText('Enter your phone number');
    assert.dom('[data-test-cs-component-input="phone-number"]').hasAttribute('type', 'tel');
    await waitFor('[data-test-cs-component="phone-number"] [aria-owns="country-listbox"]');
    assert.dom('[data-test-cs-component="phone-number"] [aria-owns="country-listbox"]').hasAttribute('title', 'United States: +1');
    assert.dom('[data-test-cs-component-validation="phone-number"]').hasText('');
  });

  test('it validates phone numbers', async function(assert) {
    await render(hbs`<PhoneNumberField @label="Enter your phone number" />`);
    await waitFor('[data-test-cs-component="phone-number"] [aria-owns="country-listbox"]');
    await fillIn('[data-test-cs-component-input="phone-number"]', '510-223-232');

    assert.dom('[data-test-cs-component-validation="phone-number"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="phone-number"]').containsText('Please enter a valid phone number')

    await fillIn('[data-test-cs-component-input="phone-number"]', '510-223-2322');

    assert.dom('[data-test-cs-component-validation="phone-number"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="phone-number"]').doesNotContainText();
  });

  test('it validates phone numbers from the PhoneNumberFields component', async function(assert) {
    this.values = A([null]);
    await render(hbs`<PhoneNumberFields @values={{values}} />`);

    await fillIn('[data-test-cs-component-input="phone-number"]', '510-223-232');

    assert.dom('[data-test-cs-component-validation="phone-number"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="phone-number"]').containsText('Please enter a valid phone number')

    await fillIn('[data-test-cs-component-input="phone-number"]', '510-223-2322');

    assert.dom('[data-test-cs-component-validation="phone-number"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="phone-number"]').doesNotContainText();
  });

  test('it renders themed component', async function (assert) {
    await render(hbs`<PhoneNumberField @label="Enter your phone number" @theme="cs-dark" />`);

    assert.dom('[data-test-cs-component="phone-number"]').hasClass('cs-dark-input-group');
    assert.dom('[data-test-cs-component-input="phone-number"]').hasClass('cs-dark-input');
  });

  test('it renders in view mode', async function (assert) {
    this.showLabelInViewMode = false;
    this.mode = 'edit';
    this.number = '+15102322512';

    await render(hbs`<PhoneNumberField @value={{number}} @label="Enter your phone number" @mode={{mode}} @showLabelInViewMode={{showLabelInViewMode}} />`);

    await waitUntil(() => {
      return find('[data-test-cs-component-input="phone-number"]').value === '(510) 232-2512';
    });

    await this.set('mode', 'view');

    assert.dom('[data-test-cs-component-view-field-value]').hasText(this.number);
    assert.dom('[data-test-cs-component-view-label]').doesNotExist();

    this.set('showLabelInViewMode', true);
    assert.dom('[data-test-cs-component-view-label]').hasText("Enter your phone number");
  });

  test('it can use the passed in id', async function(assert) {
    await render(hbs`<PhoneNumberField @id="crazy-id" @label="Crazy digits" />`);

    assert.dom('[data-test-cs-component-label="phone-number"]').hasAttribute('for', 'crazy-id');
    assert.dom('[data-test-cs-component-input="phone-number"]').hasAttribute('id', 'crazy-id');
  });
});
