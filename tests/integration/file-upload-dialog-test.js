import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | file-upload-dialog', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders component', async function(assert) {
    await render(hbs`<FileUploadDialog @acceptedFormats="png, gif, jpg" />`);

    assert.dom('[data-test-cs-component-file-upload-dialog]').exists();
    assert.dom('[data-test-cs-component-file-upload-dialog] [data-test-cs-component-file-upload-dialog-accepted-formats]').hasText('png, gif, jpg');
  });

  test('it shows file data after one has been uploaded', async function(assert) {
    await render(hbs`<FileUploadDialog @acceptedFormats="txt, rtf, dat" />`);
    let file = new File(["foo bar baz"], 'node.txt', { type: 'text/plain' });
    await triggerEvent(find('[data-test-cs-component-file-upload-dialog] input'), 'change', [file] );
    assert.dom('[data-test-cs-component-file]').exists();
    assert.dom('[data-test-cs-component-file] h4').hasText('node.txt');

    await click('[data-test-cs-component-remove-file]');
    assert.dom('[data-test-cs-component-file]').doesNotExist();
  });
});