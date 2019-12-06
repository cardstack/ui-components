import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import { A } from '@ember/array';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | email', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function(assert) {
    await render(hbs`<Email @label="Enter Email" />`);

    assert.dom('[data-test-cs-component="email"]').exists();
    assert.dom('[data-test-cs-component-label="email"]').hasText('Enter Email');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');
  });

  test('it renders the component with animated label', async function(assert) {
    await render(hbs`<Email @animatedLabel={{true}} @label="Enter Email" />`);

    assert.dom('[data-test-cs-component="email"]').exists();
    assert.dom('[data-test-cs-component-label="email"] .optional').hasText('Optional');
    assert.dom('[data-test-cs-component-label="email"] .label').hasText('Enter Email');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');
  });

  test('it renders required component', async function (assert) {
    await render(hbs`<Email @label="Enter Email" @required="true" />`);

    assert.dom('[data-test-cs-component="email"]').exists();
    assert.dom('[data-test-cs-component-input="email"]').hasAttribute('required');
    assert.dom('[data-test-cs-component-label="email"]').hasText('Enter Email');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');
  });

  test('it displays error message for invalid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');

    await fillIn('[data-test-cs-component-input="email"]', ' username ');

    assert.dom('[data-test-cs-component-validation="email"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').containsText('@');
  });

  test('it can validate valid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');

    await fillIn('[data-test-cs-component-input="email"]', 'username@cardstack.com');

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('Thank you.');
  });

  test('it only displays message for required field if it is left blank', async function (assert) {
    await render(hbs`<Email />`);
    await fillIn('[data-test-cs-component-input="email"]', 'username@cardstack.com');
    await fillIn('[data-test-cs-component-input="email"]', '');

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('');

    await render(hbs`<Email @required=true />`);
    await fillIn('[data-test-cs-component-input="email"]', 'username');
    await fillIn('[data-test-cs-component-input="email"]', '');

    assert.dom('[data-test-cs-component-validation="email"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('Please fill out this field.');
  });

  test('can add more email address fields', async function (assert) {
    this.emailValues = A([null]);
    await render(hbs`<Emails @values={{emailValues}} />`);
    await fillIn('[data-test-cs-component-input="email"]', 'username@cardstack.com');

    await click('[data-test-multi-item-list-add-btn]');

    assert.dom('[data-test-cs-component-input="email"]').exists({ count: 2 })

    await fillIn('[data-test-multi-item-list]:nth-of-type(2) [data-test-cs-component-input="email"]', 'cooldude@cardstack.com');

    assert.deepEqual(this.emailValues, ['username@cardstack.com', 'cooldude@cardstack.com']);
  });

  test('it can render the themed component', async function (assert) {
    await render(hbs`<Email @theme="dark" />`);

    assert.dom('[data-test-cs-component-input="email"]').hasClass('cs-input--dark');
  });

  test('it renders in view mode', async function (assert) {
    this.showLabelInViewMode = false;
    this.mode = 'edit';

    await render(hbs`<Email @value="schema@cardstack.com" @label="Enter your email" @mode={{mode}} @showLabelInViewMode={{showLabelInViewMode}} />`);

    assert.dom('[data-test-cs-component-input="email"]').hasValue('schema@cardstack.com');

    this.set('mode', 'view');

    assert.dom('[data-test-cs-component-view-field-value]').hasText('schema@cardstack.com');
    assert.dom('[data-test-cs-component-view-label]').doesNotExist();

    this.set('showLabelInViewMode', true);
    assert.dom('[data-test-cs-component-view-label]').hasText("Enter your email");
  });

  test('it can use the passed in id', async function(assert) {
    await render(hbs`<Email @id="crazy-email-id" @label="Crazy email" />`);

    assert.dom('[data-test-cs-component-label="email"]').hasAttribute('for', 'crazy-email-id');
    assert.dom('[data-test-cs-component-input="email"]').hasAttribute('id', 'crazy-email-id');
  });
});
