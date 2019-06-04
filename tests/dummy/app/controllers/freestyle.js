import { inject as service } from '@ember/service';
import { A } from '@ember/array';
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

export default FreestyleController.extend({
  emberFreestyle: service(),
  countries,
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
  validator(value) {
    return {
      valid: value === 'cardstack',
      message: 'Password must be "cardstack"'
    };
  }
});
