import blockTools from "@sanity/block-tools"
import Schema from '@sanity/schema'
import { blockContent } from '@johnnymoses.com/studio'
const { JSDOM } = require('jsdom');

const blockContentSchema = Schema.compile({
  name: 'schema',
  types: [
    blockContent
  ]
});

const blockContentType = blockContentSchema.get('blockContent');

export const htmlToBlocks = (htmlString) => {
  let blocks, err;
  try {
    blocks = blockTools.htmlToBlocks(
      htmlString,
      blockContentType,
      {
        parseHtml: html => new JSDOM(html).window.document
      }
    );
  } catch (error) {
    err = error;
  }
  return [err, blocks];
}
