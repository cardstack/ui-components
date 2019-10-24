import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default class StreetAddress extends Component {
  @service('google-place-autocomplete')
  googlePlaceAutocompleteService;

  label = 'Enter a street address';

  changeAction(item) {
    this.set('selected', item);
  }

  @action
  async requestPredictions(placeServiceInput) {
    if (isBlank(placeServiceInput)) {
      this.set('predictions', []);
    }
    let properties = { input: placeServiceInput };
    let predictions = await this.get('googlePlaceAutocompleteService').getPlacePredictions(properties);
    this.set('predictions', predictions);
  }
}
