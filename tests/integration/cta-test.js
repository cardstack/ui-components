import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | cta', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the default component', async function (assert) {
    await render(hbs`<Cta>Hello</Cta>`);
    assert.dom('[data-test-cs-component-cta="default"]').hasText('Hello');
  });

  test('it renders the component without block', async function (assert) {
    await render(hbs`<Cta />`);
    assert.dom('[data-test-cs-component-cta="default"]').exists();

    await render(hbs`<Cta @label="I'm a button" @variant="secondary" />`);
    assert.dom('[data-test-cs-component-cta="secondary"]').hasText(`I'm a button`);
  });

  test('it renders the component with variant', async function (assert) {
    await render(hbs`
      <Cta @variant="primary">Button</Cta>
      <Cta @variant="secondary">Button</Cta>
      <Cta @variant="primary secondary">Button</Cta>
    `);
    assert.dom('[data-test-cs-component-cta="primary"]').hasText('Button');
    assert.dom('[data-test-cs-component-cta="primary"].cs-component-cta').hasClass('primary');
    assert.dom('[data-test-cs-component-cta="secondary"]').hasText('Button');
    assert.dom('[data-test-cs-component-cta="secondary"].cs-component-cta').hasClass('secondary');
    assert.dom('[data-test-cs-component-cta="primary secondary"].cs-component-cta.primary.secondary').exists();
  });

  test('it renders disabled component', async function (assert) {
    await render(hbs`
      <Cta @disabled="true">Hello</Cta>
      <Cta @variant="secondary" @disabled="true">Button</Cta>
    `);

    assert.dom('[data-test-cs-component-cta="default"]').isDisabled();
    assert.dom('[data-test-cs-component-cta="default"]').hasClass('disabled');
    assert.dom('[data-test-cs-component-cta="secondary"]').isDisabled();
    assert.dom('[data-test-cs-component-cta="secondary"]').hasClass('disabled');
  });

  skip('it can show loading state', async function (assert) {
    await render(hbs`
      <Cta @isLoading={{true}}>Loading...</Cta>
      <Cta @isLoading={{false}} @variant="secondary">not loading</Cta>
    `);

    assert.dom('[data-test-cs-component-cta="default"]').hasClass('loading');
    assert.dom('[data-test-cs-component-cta="secondary"]').doesNotHaveClass('loading');
  });

  test('it renders themed component', async function (assert) {
    await render(hbs`
      <Cta @theme="cs-dark" @label="Button" />
      <Cta @variant="secondary" @label="Button" @theme="cs-dark" />
    `);

    assert.dom('[data-test-cs-component-cta="default"]').hasClass('cs-dark-cta');
    assert.dom('[data-test-cs-component-cta="secondary"]').hasClass('cs-dark-cta');
  });
});
