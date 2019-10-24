import TextField from './text-field';

export default class TextArea extends TextField {
  fieldType = 'text';
  dataTestName = 'text-area';
  rows = 3;
}
