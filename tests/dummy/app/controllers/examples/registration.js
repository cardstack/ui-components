import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  sourceOptions: A([ 'Magazine', 'Radio', 'EmberConf', 'Other'])
});