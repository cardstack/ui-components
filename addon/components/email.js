import BaseComponent from './base-component';
import { tracked } from '@glimmer/tracking';

export default class Email extends BaseComponent {
  @tracked label = 'Email Address';
  className= "cs-component-email";
  dataTestName = 'email';
  type = 'email';
  fieldType = 'text';
}
