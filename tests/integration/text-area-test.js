import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | text-area', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders component', async function(assert) {
    await render(hbs`<TextArea @label="What's the meaning of life?" @rows={{2}} />`);

    assert.dom('[data-test-cs-component="text-area"].cs-textarea-group.cs-input-group').exists();
    assert.dom('[data-test-cs-component-label="text-area"]').hasText("What's the meaning of life?");
    assert.dom('[data-test-cs-component-input="text-area"]').hasAttribute('rows', '2');
  });

  test('it renders required component', async function(assert) {
    await render(hbs`<TextArea @label="What's the meaning of life?" @required={{true}} />`);

    assert.dom('[data-test-cs-component-input="text-area"]').hasAttribute('required');
    assert.dom('[data-test-cs-component="text-area"]').hasClass('required');
    assert.dom('[data-test-cs-component="text-area"] .cs-input-group--required').hasText('required');
  });

  test('it renders disabled component', async function(assert) {
    await render(hbs`<TextArea @label="What's the meaning of life?" @disabled={{true}} />`);

    assert.dom('[data-test-cs-component-input="text-area"]').hasAttribute('disabled');
    assert.dom('[data-test-cs-component-input="text-area"]').hasClass('disabled');
  });

  test('it renders the component with helper text', async function (assert) {
    await render(hbs`<TextArea @helperText="I am helping." @label="What's the meaning of life?" />`);

    assert.dom('[data-test-cs-component-validation="text-area"]').hasText('I am helping.');
  });

  test('it does not display the helper text when there is an error message', async function (assert) {
    await render(hbs`<TextArea @required={{true}} @helperText="I am helping." @label="What's the meaning of life?" />`);

    await fillIn('[data-test-cs-component-input="text-area"]', '');
    assert.dom('[data-test-cs-component-validation="text-area"]').hasText('This is a required field');

    await fillIn('[data-test-cs-component-input="text-area"]', 'Bla bla bla');
    assert.dom('[data-test-cs-component-validation="text-area"]').hasText('I am helping.');
  });

  test('it shows a character counter when a character limit is passed in', async function(assert) {
    await render(hbs`<TextArea @label="What's the meaning of life?" @rows={{2}} @characterLimit={{10}} />`);

    await fillIn('[data-test-cs-component-input="text-area"]', '0123456789');
    assert.dom('[data-test-cs-textarea-char-counter]').hasText('10/10');
  });

  test('it shows a character counter when a character limit is passed in', async function (assert) {
    await render(hbs`<TextArea @label="What's the meaning of life?" @rows={{2}} @characterLimit={{10}} />`);

    await fillIn('[data-test-cs-component-input="text-area"]', '0123456789');
    assert.dom('[data-test-cs-textarea-char-counter]').hasText('10/10');
  });

  test('it can render themed component', async function (assert) {
    await render(hbs`<TextArea @label="What's the meaning of life?" @rows={{2}} @theme="cs-dark" />`);

    assert.dom('[data-test-cs-component="text-area"]').hasClass('cs-dark-input-group');
    assert.dom('[data-test-cs-component-input="text-area"]').hasClass('cs-dark-input');
  });

  test('it renders in view mode', async function (assert) {
    this.showLabelInViewMode = false;
    this.mode = 'edit';

    await render(hbs`<TextArea @label="What's the meaning of life?" @value="tacos" @rows={{2}} @theme="cs-theme" @mode={{mode}} @showLabelInViewMode={{showLabelInViewMode}} />`);

    assert.dom('[data-test-cs-component-input="text-area"]').hasValue('tacos');

    this.set('mode', 'view');

    assert.dom('[data-test-cs-component-view-field-value]').hasText('tacos');
    assert.dom('[data-test-cs-component-view-label]').doesNotExist();

    this.set('showLabelInViewMode', true);
    assert.dom('[data-test-cs-component-view-label]').hasText("What's the meaning of life?");
  });
});
