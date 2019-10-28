import Component from '@glimmer/component';

export default class Email extends Component {
  className= "cs-component-email";
  dataTestName = 'email';
  type = 'email';
  fieldType = 'text';
  label = 'Email address';
}
