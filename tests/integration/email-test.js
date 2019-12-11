import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { A } from '@ember/array';
import hbs from 'htmlbars-inline-precompile';
import fillInKeyUp from '../helpers/fill-in-key-up';

module('Integration | Component | email', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function(assert) {
    await render(hbs`<Email @label="Enter Email" />`);

    assert.dom('[data-test-cs-component="email"]').exists();
    assert.dom('[data-test-cs-component-label="email"]').hasText('Enter Email');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotContainText();
  });

  test('it renders required component', async function (assert) {
    await render(hbs`<Email @label="Enter Email" @required="true" />`);

    assert.dom('[data-test-cs-component="email"]').exists();
    assert.dom('[data-test-cs-component-input="email"]').hasAttribute('required');
    assert.dom('[data-test-cs-component-label="email"]').hasText('Enter Email');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotContainText();
  });

  test('it displays error message for invalid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotContainText();

    await fillInKeyUp('[data-test-cs-component-input="email"]', ' username ');

    assert.dom('[data-test-cs-component-validation="email"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').containsText('@');
  });

  test('it can validate valid input', async function (assert) {
    await render(hbs`<Email />`);

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotContainText();

    await fillInKeyUp('[data-test-cs-component-input="email"]', 'username@cardstack.com');

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotContainText();
  });

  test('it only displays message for required field if it is left blank', async function (assert) {
    await render(hbs`<Email />`);
    await fillInKeyUp('[data-test-cs-component-input="email"]', 'username@cardstack.com');
    await fillInKeyUp('[data-test-cs-component-input="email"]', '');

    assert.dom('[data-test-cs-component-validation="email"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').doesNotContainText();

    await render(hbs`<Email @required=true />`);
    await fillInKeyUp('[data-test-cs-component-input="email"]', 'username');
    await fillInKeyUp('[data-test-cs-component-input="email"]', '');

    assert.dom('[data-test-cs-component-validation="email"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="email"]').hasText('This is a required field');
  });

  test('can add more email address fields', async function (assert) {
    this.emailValues = A([null]);
    await render(hbs`<Emails @values={{emailValues}} />`);
    await fillInKeyUp('[data-test-cs-component-input="email"]', 'username@cardstack.com');

    await click('[data-test-multi-item-list-add-btn]');

    assert.dom('[data-test-cs-component-input="email"]').exists({ count: 2 })

    await fillInKeyUp('[data-test-multi-item-list]:nth-of-type(2) [data-test-cs-component-input="email"]', 'cooldude@cardstack.com');

    assert.deepEqual(this.emailValues, ['username@cardstack.com', 'cooldude@cardstack.com']);
  });

  test('it can render the themed component', async function (assert) {
    await render(hbs`<Email @theme="cs-dark" />`);

    assert.dom('[data-test-cs-component="email"].cs-input-group').hasClass('cs-dark-input-group');
    assert.dom('[data-test-cs-component-input="email"].cs-input').hasClass('cs-dark-input');
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
