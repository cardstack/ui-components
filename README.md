@cardstack/ui-components
==============================================================================

This is a work-in-progress addon that will contain reusable UI elements like form inputs, buttons, navbars, and more. The components can be used in regular Ember apps as well as Cardstack projects.

View the live docs by running `ember serve` in this repository and going to http://localhost:4200/freestyle. They are built using [ember-freestyle](https://github.com/chrislopresto/ember-freestyle).

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Local installation
------------------------------------------------------------------------------

* `git clone <repository-url>`
* `cd ui-components`
* `yarn install`
* `yarn link`

Then navigate into the app you want to use the addon in, and run the following command:

* `yarn link @cardstack/ui-components`
* Start your app with `ember serve`. As you make changes to the addon, if everything is working properly, your Ember app will rebuild to reflect the changes.

Remote installation
------------------------------------------------------------------------------

```sh
$ ember install @cardstack/ui-components
```

Usage
------------------------------------------------------------------------------

Use components in your app like this:

```html
{{component-name}}
or
<ComponentName />
```

Styles for this addon are opt-in. If you want to use our default styles, import them in your app's css:

```css
@import url("@cardstack/some-css-file");
```

or scss:

```css
@import '@cardstack/some-css-file'
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
