import TextField from './text-field';

export default class Email extends TextField {
  className= "cs-component-email";
  dataTestName = 'email';
  type = 'email';
  fieldType = 'text';
}
