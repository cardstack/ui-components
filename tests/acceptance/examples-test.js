import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import axeConfiguration from '../helpers/axe-configuration';

module('Acceptance | examples', function(hooks) {
  setupApplicationTest(hooks);

  test('registration visual check', async function(assert) {
    await visit('/examples/registration');
    assert.equal(currentURL(), '/examples/registration');

    percySnapshot('Sample Registration Form');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });

  test('contact form visual check', async function(assert) {
    await visit('/examples/contact-info');
    assert.equal(currentURL(), '/examples/contact-info');

    percySnapshot('Sample Contact Info Form');

    await a11yAudit(axeConfiguration);
    assert.ok(true, 'no a11y errors found!');
  });

  test('configurator visual check', async function(assert) {
    await visit('/examples/configurator');
    assert.equal(currentURL(), '/examples/configurator');

    percySnapshot('Component Configurator');

    await a11yAudit(axeConfiguration);
    assert.ok(true, 'no a11y errors found!');
  });

  test('configurator dynamically change attributes', async function(assert) {
    await visit('/examples/configurator');
    assert.equal(currentURL(), '/examples/configurator');

    assert.dom('[data-test-cs-component-input="text-field"]').hasValue('Bill Wagby', 'name is correct');
    assert.dom('[data-test-cs-component-label="text-field"] .label').hasText('Full Name', 'label is correct');
    assert.dom('[data-test-cs-component-label="text-field"] .optional').hasText('Optional', 'field is optional');

    await fillIn('#option-label', 'Title');
    await fillIn('#option-value', 'Señor Engineer');
    await click('#option-required');

    assert.dom('[data-test-cs-component-input="text-field"]').hasValue('Señor Engineer', 'title is correct');
    assert.dom('[data-test-cs-component-label="text-field"] .label').hasText('Title', 'label is correct');
    assert.dom('[data-test-cs-component-label="text-field"] .optional').doesNotExist('field is required');
  });

  test('configurator dynamically change modes', async function(assert) {
    await visit('/examples/configurator');
    assert.equal(currentURL(), '/examples/configurator');

    assert.dom('[data-test-cs-component-input="text-field"]').isNotDisabled('field is in edit mode');

    await click('#option-mode-view');

    assert.dom('[data-test-cs-component-input="text-field"]').doesNotExist('input field not present');
    assert.dom('[data-test-cs-component-view-field-value]').hasText('Bill Wagby', 'view is rendered');

    await click('#option-mode-schema');

    assert.dom('[data-test-cs-component-input="text-field"]').isDisabled('input field is disabled');
    assert.dom('[data-test-cs-component-schema-field-type]').hasText('text', 'field type is present');
    assert.dom('.cs-component-text-field--input.schema').hasValue('Bill Wagby', 'schema is rendered');

    await click('#option-mode-edit');

    assert.dom('[data-test-cs-component-input="text-field"]').isNotDisabled('field is in edit mode');
    assert.dom('[data-test-cs-component-view-field-value]').doesNotExist('view is not rendered');
    assert.dom('[data-test-cs-component-schema-field-type]').doesNotExist('field type is not present');
    assert.dom('[data-test-cs-component-schema-field-value]').doesNotExist('schema is not rendered');
  });
});