'use strict';

module.exports = function(environment/*, appConfig */) {
  let ENV = {
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

  return ENV;
};
