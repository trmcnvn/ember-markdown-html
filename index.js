'use strict';

const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const Plugin = require('broccoli-plugin');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const showdown = require('showdown');

MarkdownPlugin.prototype = Object.create(Plugin.prototype);
MarkdownPlugin.prototype.constructor = MarkdownPlugin;

function MarkdownPlugin(inputTree, options) {
  if (!(this instanceof MarkdownPlugin)) return new MarkdownPlugin(inputTree, options);

  Plugin.call(this, [inputTree], {
    persistentOutput: options.persistentOutput,
    needCache: options.needCache
  });

  this.options = {
    outputFile: options.outputFile
  };
}

MarkdownPlugin.prototype.build = function() {
  const result = readDirectory(this.inputPaths[0]);

  function readDirectory(directory) {
    const result = {};
    const entries = fs.readdirSync(directory);
    for (let entry of entries) {
      if (fs.statSync(path.join(directory, entry)).isDirectory()) {
        result[entry] = readDirectory(path.join(directory, entry));
      } else {
        const [file_name] = entry.split('.');
        const raw_data = fs.readFileSync(path.join(directory, entry), { encoding: 'utf8' });

        // @TODO: Support config-level options
        const converter = new showdown.Converter({ tables: true });
        const parsed_data = converter.makeHtml(raw_data);

        result[file_name] = parsed_data;
      }
    }

    return result;
  }

  const output = `export default ${JSON.stringify(result)};`;
  mkdirp.sync(path.join(this.outputPath, path.dirname(this.options.outputFile)));
  fs.writeFileSync(path.join(this.outputPath, this.options.outputFile), output);
}

module.exports = {
  name: 'ember-markdown-html',

  included(app) {
    this._super.included(app);
  },

  treeForAddon(tree) {
    const paths = [];

    // @TODO: Folder is hardcoded to `<root>/markdown`... Should be changed to config based.
    if (this.project.name() !== 'ember-markdown-html') {
      const root = path.join(this.project.root, 'markdown');
      if (fs.existsSync(root)) {
        paths.push(root);
      }
    } else {
      const dummy = path.join(this.project.root, 'tests/dummy/markdown');
      if (fs.existsSync(dummy)) {
        paths.push(dummy);
      }
    }

    if (paths.length > 0) {
      const funnel = new Funnel(MergeTrees(paths), {
        include: [new RegExp(/\.md/)]
      });

      const parsed = MarkdownPlugin(funnel, {
        outputFile: 'markdown-html.js'
      });

      tree = MergeTrees([tree, parsed]);
    }

    return this._super.treeForAddon.call(this, tree);
  }
};
