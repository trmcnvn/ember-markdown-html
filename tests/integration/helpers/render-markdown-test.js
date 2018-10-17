import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | render-markdown', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('path', 'test');
    await render(hbs`{{render-markdown path}}`);

    assert.dom('h1').exists();
    assert.dom('h1').hasText('Hello World');

    assert.dom('pre').exists();
    assert.dom('pre').hasTextContaining('var a = \'hello\';');

    assert.dom('blockquote').exists();
    assert.dom('blockquote').hasText('Hello World');
  });
});
