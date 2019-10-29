import BaseComponent from './base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default class StreetAddress extends BaseComponent {
  @service('google-place-autocomplete')
  googlePlaceAutocompleteService;

  @tracked selected;
  @tracked predictions;
  @tracked label = 'Enter a street address';

  changeAction(item) {
    this.selected = item;
  }

  @action
  async requestPredictions(placeServiceInput) {
    if (isBlank(placeServiceInput)) {
      this.predictions = [];
    }
    let properties = { input: placeServiceInput };
    let predictions = await this.googlePlaceAutocompleteService.getPlacePredictions(properties);
    this.predictions = predictions;
  }
}
