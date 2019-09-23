import { helper } from '@ember/component/helper';
import { classify } from '@ember/string';

export default helper(function componentCodegen(params, hash) {
  return `<${classify(params[0])}
  @value="${hash.value}"
  @label="${hash.label}"
  @required={{${hash.required}}}
  @mode="${hash.mode}"
/>`;
});
