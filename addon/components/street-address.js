import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import layout from '../templates/components/street-address';

export default Component.extend({
  layout,
  classNames: ['cs-component-street-address'],
  classNameBindings: ['isOpen:is-open'],
  googlePlaceAutocompleteService: service('google-place-autocomplete'),
  labelText: 'Enter a street address',

  actions: {
    async requestPredictions(placeServiceInput) {
      if (isBlank(placeServiceInput)) {
        this.set('predictions', []);
      }
      let properties = { input: placeServiceInput };
      let predictions = await this.get('googlePlaceAutocompleteService').getPlacePredictions(properties);
      this.set('predictions', predictions);
    }
  }
});