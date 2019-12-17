import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | password-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders component', async function(assert) {
    await render(hbs`<PasswordField @label="Enter your passcode" />`);

    assert.dom('[data-test-cs-component="password"]').exists();
    assert.dom('[data-test-cs-component-label="password"]').hasText('Enter your passcode');
    assert.dom('[data-test-cs-component-input="password"]').hasAttribute('type', 'password');
    assert.dom('[data-test-cs-component-validation="password"]').hasText('');
  });

  test('it toggles visibility', async function (assert) {
    await render(hbs`<PasswordField />`);
    await fillIn('[data-test-cs-component-input="password"]', 'xyzfda');

    assert.dom('[data-test-cs-component-input="password"]').hasAttribute('type', 'password');
    assert.dom('[data-test-cs-component-password-field-visibility-toggle]').doesNotHaveClass('hide');
    await click('[data-test-cs-component-password-field-visibility-toggle]');
    assert.dom('[data-test-cs-component-password-field-visibility-toggle]').hasClass('hide');
    assert.dom('[data-test-cs-component-input="password"]').hasAttribute('type', 'text');
  });

  test('it enforces a minimum length', async function (assert) {
    await render(hbs`<PasswordField @minLength=10 />`);
    await fillIn('[data-test-cs-component-input="password"]', 'xyz');

    assert.dom('[data-test-cs-component-validation="password"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').containsText('must be at least 10 characters')

    await fillIn('[data-test-cs-component-input="password"]', 'xyzabcddeft');

    assert.dom('[data-test-cs-component-validation="password"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').hasText('Thank you.');
  });

  test('it enforces at least one uppercase character', async function (assert) {
    await render(hbs`<PasswordField @mustIncludeUppercase=true />`);
    await fillIn('[data-test-cs-component-input="password"]', 'xyzsfa');

    assert.dom('[data-test-cs-component-validation="password"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').containsText('must include at least one uppercase character')

    await fillIn('[data-test-cs-component-input="password"]', 'Zyzsfa');

    assert.dom('[data-test-cs-component-validation="password"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').hasText('Thank you.');
  });

  test('it enforces at least one lowercase character', async function (assert) {
    await render(hbs`<PasswordField @mustIncludeLowercase=true />`);
    await fillIn('[data-test-cs-component-input="password"]', 'XYZSFA');

    assert.dom('[data-test-cs-component-validation="password"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').containsText('must include at least one lowercase character')

    await fillIn('[data-test-cs-component-input="password"]', 'ZYZSFa');

    assert.dom('[data-test-cs-component-validation="password"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').hasText('Thank you.');
  });

  test('it enforces at least one numerical character', async function (assert) {
    await render(hbs`<PasswordField @mustIncludeNumber=true />`);
    await fillIn('[data-test-cs-component-input="password"]', 'XYZSFA');

    assert.dom('[data-test-cs-component-validation="password"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').containsText('must include at least one number')

    await fillIn('[data-test-cs-component-input="password"]', 'ZYZSF4');

    assert.dom('[data-test-cs-component-validation="password"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').hasText('Thank you.');
  });

  test('it enforces at least one special character', async function (assert) {
    await render(hbs`<PasswordField @mustIncludeSpecialCharacter=true />`);
    await fillIn('[data-test-cs-component-input="password"]', 'XYZSFA');

    assert.dom('[data-test-cs-component-validation="password"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').containsText('must include at least one special character')

    await fillIn('[data-test-cs-component-input="password"]', 'ZYZSFA%');

    assert.dom('[data-test-cs-component-validation="password"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').hasText('Thank you.');
  });

  test('it accepts a custom validate function', async function (assert) {
    this.set('validate', function(value) {
      return {
        valid: value === 'c4rdst4ck',
        message: 'Password must be c4rdst4ck'
      };
    });
    await render(hbs`<PasswordField @validate={{validate}} />`);
    await fillIn('[data-test-cs-component-input="password"]', 'XYZSFA');

    assert.dom('[data-test-cs-component-validation="password"]').hasClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').containsText('must be c4rdst4ck')

    await fillIn('[data-test-cs-component-input="password"]', 'c4rdst4ck');

    assert.dom('[data-test-cs-component-validation="password"]').doesNotHaveClass('invalid');
    assert.dom('[data-test-cs-component-validation="password"]').hasText('Thank you.');
  });

  test('it can render the themed component', async function (assert) {
    await render(hbs`<PasswordField @label="Enter your passcode" @theme="cs-dark" />`);

    assert.dom('[data-test-cs-component="password"].cs-input-group').hasClass('cs-dark-input-group');
    assert.dom('[data-test-cs-component-input="password"].cs-input').hasClass('cs-dark-input');
  });

  test('it can use the passed in id', async function(assert) {
    await render(hbs`<PasswordField @id="crazy-id" @label="Crazy password" />`);

    assert.dom('[data-test-cs-component-label="password"]').hasAttribute('for', 'crazy-id');
    assert.dom('[data-test-cs-component-input="password"]').hasAttribute('id', 'crazy-id');
  });
});
