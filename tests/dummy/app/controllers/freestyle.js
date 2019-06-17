import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import FreestyleController from 'ember-freestyle/controllers/freestyle';

const countries = [
  { name: 'United States', formalName: 'United States of America' },
  { name: 'Spain', formalName: 'Kingdom of Spain' },
  { name: 'Portugal', formalName: 'Portuguese Republic' },
  { name: 'Russia', formalName: 'Russian Federation' },
  { name: 'Latvia', formalName: 'Republic of Latvia' },
  { name: 'Brazil', formalName: 'Federative Republic of Brazil' },
  { name: 'United Kingdom', formalName: 'United Kingdom of Great Britain and Northern Ireland' }
];
const customDropdownOptions = [
  { imageUrl: 'https://via.placeholder.com/50x35', cardType: 'Ether', transactionId: '0xCb3d...C16fc', network: 'Mainnet', fromValue: '15.3532 ETH', toValue: '$3993.7 USD' },
  { imageUrl: 'https://via.placeholder.com/50x35', cardType: 'Bitcoin', transactionId: '0xCb3a...C36fc', network: 'Rinkeby', fromValue: '2.3532 BTC', toValue: '$8509 USD' },
  { imageUrl: 'https://via.placeholder.com/50x35', cardType: 'Litecoin', transactionId: '0xCb3a...B96fa', network: 'Ropstein', fromValue: '82.92 LIT', toValue: '$2547 USD' }
];

export default FreestyleController.extend({
  emberFreestyle: service(),
  countries,
  customDropdownOptions,
  selected: countries[1],

  /* BEGIN-FREESTYLE-USAGE fp--notes
### A few notes regarding freestyle-palette

- Accepts a colorPalette POJO like the one found in the freestyle.js blueprint controller
- Looks very nice

And another thing...

###### Markdown note demonstrating prettified code

```
import Ember from 'ember';

export default Ember.Component.extend({
  // ...
  colorPalette: {
    'primary': {
      'name': 'cyan',
      'base': '#00bcd4'
    },
    'accent': {
      'name': 'amber',
      'base': '#ffc107'
    }
  }
  // ...
});
```
  END-FREESTYLE-USAGE */

  colorPalette: Object.freeze({
    'primary': {
      'name': 'cyan',
      'base': '#00bcd4'
    },
    'accent': {
      'name': 'amber',
      'base': '#ffc107'
    },
    'secondary': {
      'name': 'greyish',
      'base': '#b6b6b6'
    },
    'foreground': {
      'name': 'blackish',
      'base': '#212121'
    },
    'background': {
      'name': 'white',
      'base': '#ffffff'
    }
  }),

  selectItemOptions: A([
    { name: 'Red', value: 'red' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Green', value: 'green' },
    { name: 'Blue', value: 'blue' }
  ]),

  doSomething: () => {},
  searchByLengthOfCountryName: async num => Promise.resolve(countries.filter(item => item.name.length === parseInt(num))),
  streetAddresses: A([null]),
  emailValues: A([null]),
  phoneNumberValues: A([null]),
  stringifiedAddresses: computed('streetAddresses.[]', function() {
    return JSON.stringify(this.streetAddresses, null, 2);
  }),
  stringifiedEmails: computed('emailValues.[]', function() {
    return JSON.stringify(this.emailValues, null, 2);
  }),
  stringifiedPhoneNumbers: computed('phoneNumberValues.[]', function() {
    return JSON.stringify(this.phoneNumberValues, null, 2);
  }),

  validator(value) {
    return {
      valid: value === 'cardstack',
      message: 'Password must be "cardstack"'
    };
  }
});
