import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | text-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders component', async function(assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" />`);

    assert.dom('[data-test-cs-component="text-field"]').exists();
    assert.dom('[data-test-cs-component-label="text-field"] .optional').hasText("Optional");
    assert.dom('[data-test-cs-component-label="text-field"] .label').hasText("What's the meaning of life?");
    assert.dom('[data-test-cs-component-validation="text-field"]').hasClass("hidden");
  });

  test('it renders required component', async function (assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" @required="true" />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasAttribute('required');
  });

  test('it renders disabled component', async function (assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" @disabled="true" />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasAttribute('disabled');
  });

  test('it renders themed component', async function (assert) {
    await render(hbs`<TextField @label="What's the meaning of life?" @theme="cs-theme" />`);

    assert.dom('[data-test-cs-component-input="text-field"]').hasClass('cs-theme');
    assert.dom('[data-test-cs-component-label="text-field"]').hasClass('cs-theme');
    assert.dom('[data-test-cs-component-validation="text-field"]').hasClass('cs-theme');
  });
});
