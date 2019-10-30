import BaseComponent from './base-component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class FileUploadDialog extends BaseComponent {
  files = A([]);
  @service fileQueue;

  @action
  async uploadFile(file) {
    const now = new Date();
    file.uploadedDate = `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear()}`;
    this.files.addObject(file);

    if (typeof this.handleFile === 'function') {
      await this.handleFile(file);
    }
  }

  @action
  removeFile(file) {
    this.files.removeObject(file);
  }
}