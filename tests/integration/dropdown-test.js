import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { typeInSearch, clickTrigger, selectChoose } from 'ember-power-select/test-support/helpers'
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dropdown', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the component with no options', async function(assert) {
    this.options = [];
    await render(hbs`<Dropdown @label="Please select an option" @options={{options}} />`);

    assert.dom('[data-test-cs-component="dropdown"]').exists();
    assert.dom('[data-test-cs-component-label="dropdown"]').hasText('Please select an option');
    assert.dom('[data-test-cs-component-input="dropdown"]').exists();
    assert.dom('[data-test-cs-component-input="dropdown"] .ember-power-select-placeholder').hasText('Please select');

    await clickTrigger('[data-test-cs-component-input="dropdown"]');

    assert.dom('.ember-power-select-option').exists({ count: 1 });
    assert.dom('.ember-power-select-option').hasText('No results found');
  });

  test('it renders the component with custom labels', async function(assert) {
    this.options = [];
    await render(hbs`<Dropdown @options={{options}} @label="Country" @placeholder="Select a country" />`);

    assert.dom('[data-test-cs-component="dropdown"]').exists();
    assert.dom('[data-test-cs-component-input="dropdown"]').exists();
    assert.dom('[data-test-cs-component-label="dropdown"]').hasText('Country');
    assert.dom('[data-test-cs-component-input="dropdown"] .ember-power-select-placeholder').hasText('Select a country');
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
    await clickTrigger('[data-test-cs-component-input="dropdown"]');

    assert.dom('.ember-power-select-option').exists({ count: 7 });

    await typeInSearch('Lat');
    assert.dom('[data-test-cs-component-input="dropdown"] .ember-power-select-option').exists({ count: 1 });
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
    assert.dom('[data-test-cs-component-input="dropdown"] .ember-power-select-selected-item').hasText('Spain');
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
    await clickTrigger('[data-test-cs-component-input="dropdown"]');

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
    await clickTrigger('[data-test-cs-component-input="dropdown"]');

    await typeInSearch('6');
    assert.dom('.ember-power-select-option').exists({ count: 3 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').hasText('Russia');
    assert.dom('.ember-power-select-option:nth-of-type(2)').hasText('Latvia');
    assert.dom('.ember-power-select-option:nth-of-type(3)').hasText('Brazil');
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
    await clickTrigger('[data-test-cs-component-input="dropdown"]');
    await selectChoose('[data-test-cs-component-input="dropdown"]', 'Brazil');

    assert.deepEqual(selected, [{ name: 'Brazil' }]);
  });

  test('it renders options with tabular data', async function(assert) {
    this.accounts = [
      { name: 'Chase', amount: '$1234.36', country: 'US' },
      { name: 'Banco Bradesco Financiamentos', amount: '$123534.36', country: 'BR' },
      { name: 'Shoko Chukin Bank', amount: '$34.36', country: 'JP' }
    ];
    await render(hbs`
      <Dropdown @options={{accounts}} as |option|>
        <span>{{option.name}}</span>
        <span>{{option.amount}}</span>
        <span>{{option.country}}</span>
      </Dropdown>
    `);
    await clickTrigger('[data-test-cs-component-input="dropdown"]');
    assert.dom('.ember-power-select-option').exists({ count: 3 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').hasText('Chase $1234.36 US');
    assert.dom('.ember-power-select-option:nth-of-type(2)').hasText('Banco Bradesco Financiamentos $123534.36 BR');
    assert.dom('.ember-power-select-option:nth-of-type(3)').hasText('Shoko Chukin Bank $34.36 JP');
  });

  test('it renders the selected option when in view mode', async function(assert) {
    this.mode = 'edit';
    this.fruits = [
      { name: 'Banana' },
      { name: 'Apple' },
      { name: 'Orange' }
    ];

    await render(hbs`<Dropdown @options={{fruits}} @mode={{mode}}/>`);
    await clickTrigger('[data-test-cs-component-input="dropdown"]');
    await selectChoose('[data-test-cs-component-input="dropdown"]', 'Banana');

    this.set('mode', 'view');

    assert.dom('[data-test-cs-component-view-field-value]').hasText('Banana');
  });

  test('it renders the custom selected option (optionComponent passed in) when in view mode', async function(assert) {
    this.mode = 'edit';
    this.showLabelInViewMode = false;
    this.coins = [
      { imageUrl: 'https://via.placeholder.com/50x35', cardType: 'Ether', transactionId: '0xCb3d...C16fc', network: 'Mainnet', fromValue: '15.3532 ETH', toValue: '$3993.7 USD' },
      { imageUrl: 'https://via.placeholder.com/50x35', cardType: 'Bitcoin', transactionId: '0xCb3a...C36fc', network: 'Rinkeby', fromValue: '2.3532 BTC', toValue: '$8509 USD' },
      { imageUrl: 'https://via.placeholder.com/50x35', cardType: 'Litecoin', transactionId: '0xCb3a...B96fa', network: 'Ropstein', fromValue: '82.92 LIT', toValue: '$2547 USD' }
    ]

    await render(hbs`<Dropdown @options={{coins}} @label='Choose crypto' @showLabelInViewMode={{showLabelInViewMode}} @mode={{mode}} @optionComponent='custom-option' />`);
    await clickTrigger('[data-test-cs-component-input="dropdown"]');
    await selectChoose('[data-test-cs-component-input="dropdown"]', 'Litecoin');

    assert.dom('.ember-power-select-selected-item').includesText('Litecoin');
    this.set('mode', 'view');

    assert.dom('[data-test-cs-component-view-field-value]').includesText('Litecoin');
    assert.dom('[data-test-cs-component-view-label]').doesNotExist();

    this.set('showLabelInViewMode', true);
    assert.dom('[data-test-cs-component-view-label]').hasText('Choose crypto');
  });

  test('it renders the required component', async function(assert) {
    this.options = [];
    await render(hbs`<Dropdown @options={{options}} @required={{true}} @label="Country" />`);

    assert.dom('[data-test-cs-component="dropdown"]').hasClass('required');
    assert.dom('[data-test-cs-component-input="dropdown"]').hasClass('required');
    assert.dom('[data-test-cs-component="dropdown"] .cs-input-group--required').hasText('required');
  });

  test('it renders the disabled component', async function(assert) {
    this.options = [];
    await render(hbs`<Dropdown @options={{options}} @disabled={{true}} />`);

    assert.dom('[data-test-cs-component-input="dropdown"]').hasClass('disabled');

    await clickTrigger('[data-test-cs-component-input="dropdown"]');
    assert.dom('.ember-power-select-option').doesNotExist();
  });

  test('it renders the themed component', async function(assert) {
    this.options = [];
    await render(hbs`<Dropdown @theme="cs-dark" @options={{options}} />`);

    assert.dom('[data-test-cs-component="dropdown"]').hasClass('cs-dark-input-group');
    assert.dom('[data-test-cs-component-input="dropdown"]').hasClass('cs-dark-dropdown');
    assert.dom('[data-test-cs-component-input="dropdown"] .ember-power-select-trigger').exists();
  });
});
