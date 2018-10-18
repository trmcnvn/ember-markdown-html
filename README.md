ember-markdown-html
==============================================================================

[![Travis (.org)](https://img.shields.io/travis/com/trmcnvn/ember-markdown-html.svg)](https://travis-ci.com/trmcnvn/ember-markdown-html)
[![Ember Observer Score](https://emberobserver.com/badges/ember-markdown-html.svg)](https://emberobserver.com/addons/ember-markdown-html)
[![npm](https://img.shields.io/npm/v/ember-markdown-html.svg)](https://www.npmjs.com/package/ember-markdown-html)



Convert static Markdown files to HTML using Showdown at build time.

Installation
------------------------------------------------------------------------------

```
ember install ember-markdown-html
```

Usage
------------------------------------------------------------------------------

Currently this addon is hardcoded to look for Markdown files in a `markdown` folder at the project's root.

You can render the HTML by calling the provided helper:

```hbs
{{! Example: './markdown/my_markdown_file.md' }}
{{render-markdown "my_markdown_file"}}
```

Otherwise you will have access to the JSON object by importing the output file:

```js
import markdown from 'ember-markdown-html/markdown-html';
// => { [file_name]: 'html', ... }
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-markdown-html`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
