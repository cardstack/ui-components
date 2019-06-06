import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { typeInSearch, clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers'
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dropdown', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the component with no options', async function(assert) {
    this.options = [];
    await render(hbs`<Dropdown @options={{options}} />`);

    assert.dom('[data-test-cs-component="dropdown"]').exists();
    assert.dom('[data-test-cs-component-label="dropdown"]').hasText('Select an option');

    await clickTrigger('.cs-component-dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 1 });
    assert.dom('.ember-power-select-option').hasText('No results found');
  });

  test('it renders the component with custom label text', async function(assert) {
    this.options = [];
    await render(hbs`<Dropdown @options={{options}} @label="Select a Country" />`);

    assert.dom('[data-test-cs-component="dropdown"]').exists();
    assert.dom('[data-test-cs-component-label="dropdown"]').hasText('Select a Country');
  });

  test('it renders the component with options', async function(assert) {
    this.countries = [
      { name: 'United States' },
      { name: 'Spain' },
      { name: 'Portugal' },
      { name: 'Russia' },
      { name: 'Latvia' },
      { name: 'Brazil' },
      { name: 'United Kingdom' }
    ];
    await render(hbs`<Dropdown @options={{countries}} />`);
    await clickTrigger('.cs-component-dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 7 });

    await typeInSearch('Lat');
    assert.dom('.ember-power-select-option').exists({ count: 1 });
    assert.dom('.ember-power-select-option').hasText('Latvia');
  });

  test('it renders the component with pre-selected option', async function(assert) {
    this.countries = [
      { name: 'United States' },
      { name: 'Spain' },
      { name: 'Portugal' },
      { name: 'Russia' },
      { name: 'Latvia' },
      { name: 'Brazil' },
      { name: 'United Kingdom' }
    ];
    this.spain = this.countries[1];
    await render(hbs`<Dropdown @options={{countries}} @selected={{spain}} />`);
    assert.dom('.ember-power-select-selected-item').hasText('Spain');
  });

  test('it renders the component with custom search field', async function(assert) {
    this.countries = [
      { formalName: 'United States of America' },
      { formalName: 'Kingdom of Spain' },
      { formalName: 'Portuguese Republic' },
      { formalName: 'Russian Federation' },
      { formalName: 'Republic of Latvia' },
      { formalName: 'Federative Republic of Brazil' },
      { formalName: 'United Kingdom of Great Britain and Northern Ireland' }
    ];
    await render(hbs`<Dropdown @options={{countries}} @searchField="formalName" />`);
    await clickTrigger('.cs-component-dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 7 });

    await typeInSearch('Republic');
    assert.dom('.ember-power-select-option').exists({ count: 3 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').hasText('Portuguese Republic');
    assert.dom('.ember-power-select-option:nth-of-type(2)').hasText('Republic of Latvia');
    assert.dom('.ember-power-select-option:nth-of-type(3)').hasText('Federative Republic of Brazil');
  });

  test('it renders the component with custom search action', async function(assert) {
    let countries = [
      { name: 'United States' },
      { name: 'Spain' },
      { name: 'Portugal' },
      { name: 'Russia' },
      { name: 'Latvia' },
      { name: 'Brazil' },
      { name: 'United Kingdom' }
    ];
    this.searchByLengthOfCountryName = async searchTerm => Promise.resolve(countries.filter(item => item.name.length === parseInt(searchTerm)));
    await render(hbs`<Dropdown @searchAction={{action searchByLengthOfCountryName}} />`);
    await clickTrigger('.cs-component-dropdown');

    await typeInSearch('6');
    assert.dom('.ember-power-select-option').exists({ count: 3 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').hasText('Russia');
    assert.dom('.ember-power-select-option:nth-of-type(2)').hasText('Latvia');
    assert.dom('.ember-power-select-option:nth-of-type(3)').hasText('Brazil');
  });

  test('it renders themed component', async function (assert) {
    this.options = [];
    await render(hbs`<Dropdown @options={{options}} @theme="cs-theme" />`);

    assert.dom('[data-test-cs-component="dropdown"].cs-theme').exists();
    assert.dom('[data-test-cs-component-label="dropdown"].cs-theme').exists();
  });

  test('it calls a custom action when onchange event is triggered', async function(assert) {
    this.countries = [
      { name: 'United States' },
      { name: 'Spain' },
      { name: 'Portugal' },
      { name: 'Russia' },
      { name: 'Latvia' },
      { name: 'Brazil' },
      { name: 'United Kingdom' }
    ];
    let selected = [];
    this.updateAction = selectedObject => {
      selected.push(selectedObject);
    }
    await render(hbs`<Dropdown @options={{countries}} @changeAction={{action updateAction}} />`);
    await clickTrigger('.cs-component-dropdown');
    await selectChoose('.cs-component-dropdown', 'Brazil');

    assert.deepEqual(selected, [{ name: 'Brazil' }]);
  });
});
