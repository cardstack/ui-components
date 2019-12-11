import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import fillInKeyUp from '../helpers/fill-in-key-up';

module('Integration | Component | text-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the default component', async function(assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" />`);

    assert.dom('[data-test-cs-component="text-field"]').exists();
    assert.dom('[data-test-cs-component-label="text-field"]').exists();
    assert.dom('[data-test-cs-component-input="text-field"]').exists();
    assert.dom('[data-test-cs-component-label="text-field"]').hasText("What's the meaning of life?");
  });

  test('it can set a value', async function (assert) {
    assert.expect(3);

    this.set('setValue', function(val) {
      assert.equal(val, 'bar');
    });

    await render(hbs`<TextField @value="foo" @setValue={{setValue}} />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasValue('foo');

    await fillInKeyUp('[data-test-cs-component-input="text-field"]', 'bar');

    assert.dom('[data-test-cs-component-input="text-field"]').hasValue('bar');
  });

  test('it renders required component', async function (assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" @required="true" />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasAttribute('required');
    assert.dom('[data-test-cs-component="text-field"]').hasClass('required');
    assert.dom('[data-test-cs-component="text-field"] .cs-input-group--required').hasText('required');
  });

  test('it renders the component with helper text', async function (assert) {
    await render(hbs`<TextField @helperText="I am helping." @label="What's the meaning of life?" />`);

    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('I am helping.');
  });

  test('it does not display the helper text when there is an error message', async function (assert) {
    await render(hbs`<TextField @required={{true}} @helperText="I am helping." @label="What's the meaning of life?" />`);

    await fillIn('[data-test-cs-component-input="text-field"]', '');
    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('This is a required field');

    await fillIn('[data-test-cs-component-input="text-field"]', 'Bla bla bla');
    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('I am helping.');
  });

  test('it can validate text input', async function(assert) {
    await render(hbs`<TextField @pattern="[0-9]+" />`);

    assert.dom('[data-test-cs-component="text-field"]').exists();

    await fillInKeyUp('[data-test-cs-component-input="text-field"]', 'foo');

    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('Please match the requested format.');

    await fillInKeyUp('[data-test-cs-component-input="text-field"]', '1234');

    assert.dom('[data-test-cs-component-validation="text-field"]').doesNotContainText();
  });

  test('it can override the default validation message', async function(assert) {
    await render(hbs`<TextField @pattern="[0-9]+" @title="Only numbers please!"/>`);

    assert.dom('[data-test-cs-component="text-field"]').exists();

    await fillInKeyUp('[data-test-cs-component-input="text-field"]', 'foo');
    // await triggerEvent('[data-test-cs-component-input="text-field"]', 'keyup');

    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('Only numbers please!');

    await fillInKeyUp('[data-test-cs-component-input="text-field"]', '1234');

    assert.dom('[data-test-cs-component-validation="text-field"]').doesNotContainText();
  });

  test('it renders disabled component', async function (assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" @disabled="true" />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasAttribute('disabled');
    assert.dom('[data-test-cs-component-input="text-field"]').hasClass('disabled');
  });

  test('it renders themed component', async function (assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" @theme="cs-dark" />`);

    assert.dom('[data-test-cs-component="text-field"]').hasClass('cs-dark-input-group');
    assert.dom('[data-test-cs-component-input="text-field"]').hasClass('cs-dark-input');
  });

  test('it renders in view mode', async function (assert) {
    this.showLabelInViewMode = false;
    this.mode = 'edit';

    await render(hbs`<TextField @value="Hello world" @label="What's the meaning of life?" @theme="cs-theme" @mode={{mode}} @showLabelInViewMode={{showLabelInViewMode}} />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasValue('Hello world');

    this.set('mode', 'view');

    assert.dom('[data-test-cs-component-view-field-value]').hasText('Hello world');
    assert.dom('[data-test-cs-component-view-label]').doesNotExist();

    this.set('showLabelInViewMode', true);
    assert.dom('[data-test-cs-component-view-label]').hasText("What's the meaning of life?");
  });

  test('it can use the passed in id', async function(assert) {
    await render(hbs`<TextField @id="crazy-id" @label="What's the meaning of life?" />`);

    assert.dom('[data-test-cs-component-label="text-field"]').hasAttribute('for', 'crazy-id');
    assert.dom('[data-test-cs-component-input="text-field"]').hasAttribute('id', 'crazy-id');
  });
});
