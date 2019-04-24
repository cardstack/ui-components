import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';

module('Acceptance | components', function(hooks) {
  setupApplicationTest(hooks);

  test('components visual check', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');

    percySnapshot('UI Components');
  });
});
