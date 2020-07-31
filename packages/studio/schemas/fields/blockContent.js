/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Button",
      type: "button",
    },
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Display1", value: "display1" },
        { title: "Display2", value: "display2" },
        { title: "Quote", value: "blockquote" },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        decorators: [
          { value: "strong", title: "Strong" },
          { value: "italic", title: "Italic" },
          { value: "underline", title: "Underline" },
          {
            value: "lushootseed",
            title: "Lushootseed",
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
          {
            title: "Page Link",
            name: "internalLink",
            type: "object",
            fields: [
              {
                name: "reference",
                type: "reference",
                to: [{ type: "page" }],
              },
            ],
          },
        ],
      },
    },
  ],
};
