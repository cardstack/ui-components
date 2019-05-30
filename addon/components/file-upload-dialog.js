import Component from '@ember/component';
import layout from '../templates/components/file-upload-dialog';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({
  layout,
  classNames: ['cs-component-file-upload-dialog'],
  attributeBindings: ['dataTestName:data-test-cs-component-file-upload-dialog'],
  dataTestName: true,
  files: A([]),
  fileQueue: service(),
  actions: {
    async uploadFile(file) {
      const now = new Date();
      file.uploadedDate = `${now.getMonth()}.${now.getDay()}.${now.getFullYear()}`;
      this.files.addObject(file);

      if (typeof this.handleFile === 'function') {
        await this.handleFile(file);
      }
    },

    removeFile(file) {
      this.files.removeObject(file);
    }
  }

});
