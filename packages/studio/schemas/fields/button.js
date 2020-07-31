import React from "react";

const Button = ({ value }) => {
  const { text, variant, to } = value;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "8px 16px",
        border: "1px solid currentColor",
        borderRadius: 4,
        margin: "0.5rem",
      }}
    >
      {text}
    </span>
  );
};

export default {
  title: "Button",
  name: "button",
  type: "object",
  fields: [
    {
      title: "Text",
      name: "text",
      type: "string",
    },
    {
      title: "Icon",
      name: "icon",
      type: "string",
    },
    {
      title: "Variant",
      name: "variant",
      type: "string",
    },
    {
      title: "href",
      name: "href",
      type: "url",
    },
    {
      title: "To",
      name: "to",
      type: "reference",
      to: [{ type: "page" }],
    },
  ],
  preview: {
    select: {
      text: "text",
      variant: "variant",
      to: "to",
    },
    component: Button,
  },
};
