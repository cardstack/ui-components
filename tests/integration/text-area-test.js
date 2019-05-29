import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, typeIn} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | text-area', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders component', async function(assert) {
    await render(hbs`<TextArea @label="What's the meaning of life?" @rows={{2}} />`);

    assert.dom('[data-test-cs-component="textarea"]').exists();
    assert.dom('[data-test-cs-component-text-area-label] .label').hasText("What's the meaning of life?");
    assert.dom('[data-test-cs-component="textarea"] textarea').hasAttribute('rows', '2');
  });

  test('it shows a character counter when a character limit is passed in', async function(assert) {
    await render(hbs`<TextArea @label="What's the meaning of life?" @rows={{2}} @characterLimit={{10}} />`);

    await typeIn('[data-test-cs-component="textarea"] textarea', '0123456789');
    assert.dom('[data-test-cs-component-text-area-char-counter]').hasText('10/10');
  });
});
