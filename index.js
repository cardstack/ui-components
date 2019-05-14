'use strict';
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const join = require('path').join;

module.exports = {
  name: require('./package').name,
  isDevelopingAddon() {
    return true
  },
  included: function(/* app */) {
    this._super.included.apply(this, arguments);
  },

  treeForPublic: function() {
    const imagesDir = new Funnel(join(this.root, 'public'), {
      include: ['**/*'],
      destDir: '/assets'
    });

    return mergeTrees([imagesDir]);
  }
};
