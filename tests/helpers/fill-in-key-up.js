import { fillIn, triggerEvent } from '@ember/test-helpers';

export default async function fillInKeyUp(selector, val) {
  await fillIn(selector, val);
  await triggerEvent(selector, 'keyup');
}