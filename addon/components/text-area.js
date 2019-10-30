import TextField from './text-field';
import { tracked } from '@glimmer/tracking';

export default class TextArea extends TextField {
  @tracked dataTestName = 'text-area';
  @tracked rows = 3;
  fieldType = 'text';
}
