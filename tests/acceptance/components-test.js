import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { percySnapshot } from 'ember-percy';
import a11yAudit from 'ember-a11y-testing/test-support/audit';

module('Acceptance | components', function(hooks) {
  setupApplicationTest(hooks);

  test('components visual check', async function(assert) {
    await visit('/freestyle');
    assert.equal(currentURL(), '/freestyle');

    percySnapshot('UI Components');

    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });

  test('single selection component', async function(assert) {
    await visit('/freestyle');
    assert.equal(currentURL(), '/freestyle');

    assert.dom('.cs-component-choose-one--label').exists({ count: 4 });

    await click('[data-test-choice-value="red"]');

    assert.dom('.cs-component-choose-one--label.checked').exists({ count: 1 });
    assert.dom('.cs-component-choose-one--label.checked').hasText('Red');

    await click('[data-test-choice-value="blue"]');

    assert.dom('.cs-component-choose-one--label.checked').exists({ count: 1 });
    assert.dom('.cs-component-choose-one--label.checked').hasText('Blue');
  });

  test('multiple selection component', async function(assert) {
    await visit('/freestyle');
    assert.equal(currentURL(), '/freestyle');

    assert.dom('.cs-component-choose-many--label').exists({ count: 4 });
    assert.dom('.cs-component-choose-many--label.checked').doesNotExist();

    await click('.cs-component-choose-many--label [data-test-choice-value="red"]');

    assert.dom('.cs-component-choose-many--label.checked').exists({ count: 1 });
    assert.dom('.cs-component-choose-many--label.checked').hasText('Red');

    await click('.cs-component-choose-many--label [data-test-choice-value="blue"]');

    assert.dom('.cs-component-choose-many--label.checked').exists({ count: 2 });
    assert.dom('.cs-component-choose-many--label.checked [data-test-choice-value="blue"]').hasText('Blue');
  });
});
