import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
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
});