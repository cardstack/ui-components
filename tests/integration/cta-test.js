import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cta', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the default component', async function (assert) {
    await render(hbs`<Cta>Hello</Cta>`);
    assert.dom('[data-test-cs-component-cta="primary"]').hasText('Hello');
  });

  test('it renders the component without block', async function (assert) {
    await render(hbs`<Cta />`);
    assert.dom('[data-test-cs-component-cta="primary"]').exists();

    await render(hbs`<Cta @label="I'm a button" @variant="secondary" />`);
    assert.dom('[data-test-cs-component-cta="secondary"]').hasText(`I'm a button`);
  });

  test('it renders the component with variant', async function (assert) {
    await render(hbs`
      <Cta @variant="primary">Button</Cta>
      <Cta @variant="secondary">Button</Cta>
    `);
    assert.dom('[data-test-cs-component-cta="primary"]').hasText('Button');
    assert.dom('[data-test-cs-component-cta="secondary"]').hasText('Button');
  });

  test('it renders disabled component', async function (assert) {
    await render(hbs`
      <Cta @disabled="true">Hello</Cta>
      <Cta @variant="secondary" @disabled="true">Button</Cta>
    `);

    assert.dom('[data-test-cs-component-cta="primary"]').hasAttribute('disabled');
    assert.dom('[data-test-cs-component-cta="secondary"]').hasAttribute('disabled');
  });

  test('it renders themed component', async function (assert) {
    await render(hbs`
      <Cta @theme="cs-theme" @label="Button" />
      <Cta @variant="secondary" @label="Button" @theme="cs-theme" />
    `);

    assert.dom('[data-test-cs-component-cta="primary"]').hasClass('cs-theme');
    assert.dom('[data-test-cs-component-cta="secondary"]').hasClass('cs-theme');
  });
});
