'use strict';

module.exports = function(environment/*, appConfig */) {
  let ENV = { };

  if (environment === 'production') {
    ENV.rootURL = '/ui-components';
    ENV.locationType = 'hash';
  }

  return ENV;
};
