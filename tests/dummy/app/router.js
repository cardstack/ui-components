import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('freestyle');
  this.route('examples', function() {
    this.route('registration');
    this.route('contact-info');
    this.route('configurator');
  });
});

