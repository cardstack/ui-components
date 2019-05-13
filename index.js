'use strict';
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,
  isDevelopingAddon() {
    return true
  },
  included: function(/* app */) {
    this._super.included.apply(this, arguments);
  },
  treeForPublic: function(tree) {
    const assetsTree = new Funnel('public');
    return mergeTrees([tree, assetsTree], {
      overwrite: true,
    });
  }
};
