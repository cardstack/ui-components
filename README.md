ui-components-library
==============================================================================

This is a work-in-progress addon that will contain reusable UI elements like form inputs, buttons, navbars, and more. The components can be used in regular Ember apps as well as Cardstack projects.

View the live docs by running `ember serve` in this repository. They are built using [ember-freestyle](https://github.com/chrislopresto/ember-freestyle).

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Local installation
------------------------------------------------------------------------------

* `git clone <repository-url>`
* `cd ui-components-library`
* `npm install`
* `npm link`

Then navigate into the app you want to use the addon in, and run the following command:

* `npm link @cardstack/ui-components-library`
* Start your app with `ember serve`. As you make changes to the addon, if everything is working properly, your Ember app will rebuild to reflect the changes.

Remote installation
------------------------------------------------------------------------------

During early greenfield development, you can install this addon from GitHub by adding the following to your project's `package.json`:

```json
"@cardstack/ui-components-library": "github:cardstack/ui-components-library#master"
```

Whatever comes after the `#` can be a tag, commit hash, or branch name.

Usage
------------------------------------------------------------------------------

Use components in your app like this:

```html
{{component-name}}
or
<ComponentName />
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
