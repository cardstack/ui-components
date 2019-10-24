import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | choose-contact-type', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function(assert) {
    await render(hbs`<ChooseContactType />`);

    assert.dom('[data-test-cs-component="choose-contact-type"]').exists();
  });

  test('it highlights the currently selected option', async function(assert) {
    await render(hbs`<ChooseContactType />`);
    await click('[data-test-choice-value="cell"]')
    assert.dom('.cs-component-choose-one--label.checked').hasText('Cell');
  });

  test('it adds a contact type to the list of options', async function(assert) {
    await render(hbs`<ChooseContactType />`);

    assert.dom('[data-test-cs-component="choose-contact-type"]').exists();
    await click('[data-test-choice-value="_add"]')
    await fillIn('[data-test-cs-component="text-field"] input', 'cell2');
    await click('[data-test-cs-component-cta="primary"]');
    let values = findAll('[data-test-choice-value]').map(elem => elem.getAttribute('data-test-choice-value'));
    assert.deepEqual(values, ['cell', 'home', 'work', 'cell2', '_add']);
    assert.dom('.cs-component-choose-one--label.checked').hasText('cell2');
    assert.dom('[data-test-cs-component="text-field"]').doesNotExist();
  });
});