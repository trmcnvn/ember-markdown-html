import { helper } from '@ember/component/helper';
import { get } from '@ember/object';
import { htmlSafe } from '@ember/string';
import markdown from 'ember-markdown-html/markdown-html';

export function renderMarkdown([path]) {
  const html = get(markdown, path.replace(/\//g, '.'));
  return htmlSafe(html);
}

export default helper(renderMarkdown);
