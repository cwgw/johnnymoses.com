import blockTools from "@sanity/block-tools"
import Schema from '@sanity/schema'
import { blockContent } from '@johnnymoses.com/studio'
import createDOMPurify from 'dompurify';
const { JSDOM } = require('jsdom');

const blockContentSchema = Schema.compile({
  name: 'schema',
  types: [
    blockContent
  ]
});

const blockContentType = blockContentSchema.get('blockContent');

export const getSanitizedPortableText = htmlString => {
  let blocks, textContent, err;

  try {
    const dom = new JSDOM(htmlString);
    const DOMPurify = createDOMPurify(dom.window)
    const sanitizedBody = DOMPurify.sanitize(dom.window.document.body, { RETURN_DOM: true })

    textContent = sanitizedBody.textContent;
    blocks = blockTools.htmlToBlocks(
      sanitizedBody.innerHTML,
      blockContentType,
      {
        parseHtml: html => {
          dom.window.document.body.innerHTML = html;
          return dom.window.document;
        }
      }
    );    
  } catch (error) {
    err = error;
  }

  return [err, { blocks, textContent }];
}