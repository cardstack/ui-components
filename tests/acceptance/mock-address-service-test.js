import { module, test } from 'qunit';
import { visit, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers';
import MockAddressService from '../helpers/mock-address-service';

module('Acceptance | Street address component', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    this.owner.register('service:google-place-autocomplete', MockAddressService);
    this.owner.inject('component:street-address', 'google-place-autocomplete', 'service:google-place-autocomplete');
  });

  test('street address component shows dropdown of address when searching', async function(assert) {
    await visit('/freestyle?s=Street%20Address');
    await clickTrigger('[data-test-cs-component="street-address"]');
    await fillIn('[data-test-cs-component="street-address"] .ember-power-select-search-input', 'abc');

    assert.dom('[data-test-cs-component="street-address"] .ember-power-select-option').exists({ count: 3 });

    await selectChoose('.cs-component-street-address', '12 Grimmauld Place');

    assert.dom('[data-test-cs-component="street-address"] .ember-power-select-selected-item').hasText('12 Grimmauld Place');
  });

  test('street address component shows no results if no results', async function(assert) {
    await visit('/freestyle?s=Street%20Address');
    await clickTrigger('[data-test-cs-component="street-address"]');
    await fillIn('.ember-power-select-search-input', 'xyz');

    assert.dom('.ember-power-select-option').exists({ count: 1 });
    assert.dom('.ember-power-select-option').hasText('No results found');

  });
});
