# How To Contribute

## Installation

* `git clone <repository-url>`
* `cd ui-components-library`
* `npm install`

## Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

## Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

This addon uses [ember-a11y-testing](https://github.com/ember-a11y/ember-a11y-testing) to check for accessibility issues. Read the full testing error message and check the console for instructions to resolve any issues.

## Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

## Creating a new component

To make a new component, use the command:

```sh
ember generate component my-component-name
```

Do your work in `addon/templates/components/my-component-name.hbs` and `addon/components/my-component-name.js`. Whenever you create a new component, add it to the styleguide at `index.hbs` so it becomes part of the documentation and tests. See [ember-freestyle](http://ember-freestyle.com/) for syntax.

To add styles, create a file in `addon/styles/my-component-name.scss`, and import it in `addon.scss`. In general, if there are classes you think will be used in multiple components, put them in `main.scss`. If the styles are specific to your component, put them in the scss file for that component, and nest them inside a class with the component's name. Don't forget to add the component's name as a class in the hbs too.

```css
.my-component-name {
    .some-other-class {
        padding: 20px;
    }
}
```

Try to use what is already in `main.scss` and `variables.scss` before declaring new styles.

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).