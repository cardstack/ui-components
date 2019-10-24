import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | choose-many', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the component with no choices', async function(assert) {
    await render(hbs`<ChooseMany />`);

    assert.dom('[data-test-cs-component="choose-many"]').exists();
    assert.dom('[data-test-choose-item]').doesNotExist();
  });

  test('it renders the component with an array of strings', async function(assert) {
    this.set('choices', ['red', 'yellow', 'green', 'blue']);
    await render(hbs`<ChooseMany @choices={{choices}} />`);

    assert.dom('[data-test-cs-component="choose-many"]').exists();
    assert.dom('.cs-component-choose-many--label').exists({ count: 4 });
    assert.dom('[data-test-choice-value="red"]').hasText('red');
    assert.dom('[data-test-choice-value="yellow"]').hasText('yellow');
    assert.dom('[data-test-choice-value="green"]').hasText('green');
    assert.dom('[data-test-choice-value="blue"]').hasText('blue');
  });

  test('it renders the component with an array of objects', async function(assert) {
    this.set('choices', [
      { name: 'Red', value: 'red' },
      { name: 'Yellow', value: 'yellow' },
      { name: 'Green', value: 'green' },
      { name: 'Blue', value: 'blue' }
    ]);
    await render(hbs`<ChooseMany @choices={{choices}} />`);

    assert.dom('[data-test-cs-component="choose-many"]').exists();
    assert.dom('.cs-component-choose-many--label').exists({ count: 4 });
    assert.dom('[data-test-choice-value="red"]').hasText('Red');
    assert.dom('[data-test-choice-value="yellow"]').hasText('Yellow');
    assert.dom('[data-test-choice-value="green"]').hasText('Green');
    assert.dom('[data-test-choice-value="blue"]').hasText('Blue');
  });

  test('it displays a legend', async function(assert) {
    this.set('choices', ['red', 'yellow', 'green', 'blue']);
    await render(hbs`<ChooseMany @choices={{choices}} @legend="Favorite Colors" />`);

    assert.dom('[data-test-cs-component="choose-many"]').exists();
    assert.dom('.cs-component-choose-many--label').exists({ count: 4 });
    assert.dom('.cs-component-choose-many--legend').hasText('Favorite Colors');
  });

  test('clicking on an item marks it as checked', async function(assert) {
    this.set('choices', ['red', 'yellow', 'green', 'blue']);
    await render(hbs`<ChooseMany @choices={{choices}} />`);

    assert.dom('.cs-component-choose-many--label.checked').doesNotExist();
    assert.dom('[data-test-cs-component="choose-many"].checked').doesNotExist();

    await click('[data-test-choice-value="red"]');

    assert.dom('.cs-component-choose-many--label.checked').exists({ count: 1 });
    assert.dom('.cs-component-choose-many--label.checked').hasText('red');
    assert.dom('[data-test-cs-component="choose-many"].checked').exists();

    await click('[data-test-choice-value="blue"]');

    assert.dom('.cs-component-choose-many--label.checked').exists({ count: 2 });
    assert.dom('.cs-component-choose-many--label.checked [data-test-choice-value="blue"]').hasText('blue');
  });

  test('can trigger an action when selection changes', async function(assert) {
    assert.expect(1);

    this.set('choices', ['red', 'yellow', 'green', 'blue']);
    this.set('selectionChanged', (choice) => {
      assert.deepEqual(choice, ['green']);
    });
    await render(hbs`<ChooseMany @choices={{choices}} @selectionChanged={{selectionChanged}} />`);

    await click('[data-test-choice-value="green"]');
  });
});