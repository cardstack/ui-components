import Service from '@ember/service';

const MockAddressService = Service.extend({
  getPlacePredictions({ input: properties }) {
    if (properties === 'xyz') {
      return [];
    }
    return [
      { description: '345 Hemlock Drive' },
      { description: '12 Grimmauld Place' },
      { description: '221B Baker Street' }
    ];
  }
});

export default MockAddressService;