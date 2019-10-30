import BaseComponent from './base-component';
import { tracked } from '@glimmer/tracking';

export default class Cta extends BaseComponent {
  @tracked variant = 'primary';
  @tracked disabled = false;
  
  handleClick() {}
}
