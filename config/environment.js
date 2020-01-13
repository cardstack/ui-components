'use strict';

module.exports = function(environment/*, appConfig */) {
  let ENV = {
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
        EMBER_NATIVE_DECORATOR_SUPPORT: true,
        EMBER_METAL_TRACKED_PROPERTIES: true,
        EMBER_GLIMMER_ANGLE_BRACKET_NESTED_LOOKUP: true,
        EMBER_GLIMMER_ANGLE_BRACKET_BUILT_INS: true,
        EMBER_GLIMMER_FN_HELPER: true,
        EMBER_GLIMMER_ON_MODIFIER: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    phoneInput: {
      lazyLoad: true,    // default false
      hasPrepend: false  // default false
    }
  };

  if (environment === 'production') {
    ENV.rootURL = '/ui-components';
    ENV.locationType = 'hash';
    ENV.phoneInput.hasPrepend = true;
  }

  if (environment === 'test') {
    ENV['@cardstack/ui-components'] = {
      debounceSpeed: 10
    }
  }

  return ENV;
};
