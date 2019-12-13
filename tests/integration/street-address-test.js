import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import { A } from '@ember/array';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers';
import MockAddressService from '../helpers/mock-address-service';

module('Integration | Component | street address', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    this.owner.register('service:google-place-autocomplete', MockAddressService);
    this.owner.inject('component:street-address', 'google-place-autocomplete', 'service:google-place-autocomplete');
  });

  test('street address component shows dropdown of address when searching', async function(assert) {
    await render(hbs`<StreetAddress @label="Enter your address" />`);
    await clickTrigger('[data-test-cs-component="street-address"]');
    await fillIn('.ember-power-select-search-input', 'abc');

    assert.dom('.ember-power-select-option').exists({ count: 3 });

    await selectChoose('.cs-component-street-address', '12 Grimmauld Place');

    assert.dom('.ember-power-select-selected-item').hasText('12 Grimmauld Place');
  });

  test('street address component shows no results if no results', async function(assert) {
    await render(hbs`<StreetAddress @label="Enter your address" />`);
    await clickTrigger('[data-test-cs-component="street-address"]');
    await fillIn('.ember-power-select-search-input', 'xyz');

    assert.dom('.ember-power-select-option').exists({ count: 1 });
    assert.dom('.ember-power-select-option').hasText('No results found');
  });

  test('it renders the themed component', async function (assert) {
    await render(hbs`<StreetAddress @label="Enter your address" @theme="cs-dark" />`);

    assert.dom('[data-test-cs-component="street-address"].cs-dropdown.dark-dropdown').exists();
    assert.dom('[data-test-cs-component="street-address"] .ember-power-select-trigger').exists();
    assert.dom('[data-test-cs-component="street-address"] .ember-power-select-placeholder').hasText('Enter your address');
  });

  test('can add another street address', async function(assert) {
    this.streetAddresses = A([null]);
    await render(hbs`<StreetAddresses @values={{streetAddresses}}/>`);

    assert.dom('[data-test-cs-component="street-address"]').exists({ count: 1 });

    await clickTrigger('[data-test-cs-component="street-address"]');
    await fillIn('.ember-power-select-search-input', 'abc');
    await selectChoose('.cs-component-street-address', '12 Grimmauld Place');

    assert.deepEqual(this.streetAddresses, [{ description: '12 Grimmauld Place' }]);

    await click('[data-test-multi-item-list-add-btn]');

    assert.dom('[data-test-cs-component="street-address"]').exists({ count: 2 });
  });

  test('it renders in view mode', async function (assert) {
    this.showLabelInViewMode = false;
    this.mode = 'edit';
    this.selectedAddress = '12 Grimmauld Place';

    await render(hbs`<StreetAddress @label="Where do you live?" @selected={{selectedAddress}} @mode={{mode}} @showLabelInViewMode={{showLabelInViewMode}} />`);

    this.set('mode', 'view');

    assert.dom('[data-test-cs-component-view-field-value]').hasText(this.selectedAddress);
    assert.dom('[data-test-cs-component-view-label]').doesNotExist();

    this.set('showLabelInViewMode', true);

    assert.dom('[data-test-cs-component-view-label]').hasText("Where do you live?");
  });
});
