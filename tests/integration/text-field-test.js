import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | text-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the default component', async function(assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" />`);

    assert.dom('[data-test-cs-component="text-field"]').exists();
    assert.dom('[data-test-cs-component-label="text-field"]').exists();
    assert.dom('[data-test-cs-component-input="text-field"]').exists();
    assert.dom('[data-test-cs-component-label="text-field"]').hasText("What's the meaning of life?");
  });

  test('it renders the component with animated label', async function(assert) {
    await render(hbs`<TextField @animatedLabel={{true}} @label="What's the meaning of life?" />`);

    assert.dom('[data-test-cs-component="text-field"]').exists();
    assert.dom('[data-test-cs-component-label="text-field"] .optional').hasText("Optional");
    assert.dom('[data-test-cs-component-label="text-field"] .label').hasText("What's the meaning of life?");
    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('');
  });

  test('it can set a value', async function (assert) {
    assert.expect(3);

    this.set('setValue', function(val) {
      assert.equal(val, 'bar');
    });

    await render(hbs`<TextField @value="foo" @setValue={{setValue}} />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasValue('foo');

    await fillIn('[data-test-cs-component-input="text-field"]', 'bar');

    assert.dom('[data-test-cs-component-input="text-field"]').hasValue('bar');
  });

  test('it renders required component', async function (assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" @required="true" />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasAttribute('required');
  });

  test('it can validate text input', async function(assert) {
    await render(hbs`<TextField @pattern="[0-9]+" />`);

    assert.dom('[data-test-cs-component="text-field"]').exists();

    await fillIn('[data-test-cs-component-input="text-field"]', 'foo');

    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('Please match the requested format.');

    await fillIn('[data-test-cs-component-input="text-field"]', '1234');

    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('Thank you.');
  });

  test('it can override the default validation message', async function(assert) {
    await render(hbs`<TextField @pattern="[0-9]+" @title="Only numbers please!"/>`);

    assert.dom('[data-test-cs-component="text-field"]').exists();

    await fillIn('[data-test-cs-component-input="text-field"]', 'foo');

    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('Only numbers please!');

    await fillIn('[data-test-cs-component-input="text-field"]', '1234');

    assert.dom('[data-test-cs-component-validation="text-field"]').hasText('Thank you.');
  });

  test('it renders disabled component', async function (assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" @disabled="true" />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasAttribute('disabled');
  });

  test('it renders themed component', async function (assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" @theme="dark" />`);

    assert.dom('[data-test-cs-component="text-field"]').hasClass('cs-input-group--dark');
    assert.dom('[data-test-cs-component-label="text-field"]').hasClass('cs-label--dark');
    assert.dom('.cs-input--dark').exists();
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
