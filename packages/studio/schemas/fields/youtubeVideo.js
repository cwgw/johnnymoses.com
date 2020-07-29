import React from "react";

const getYoutubeThumbnailSrc = _url => {
  let url;
  try {
    url = new URL(_url);
  } catch (error) {
    console.warn(url);
    return;
  }

  const { searchParams } = url;
  const v = searchParams.get("v");

  if (!v) {
    return;
  }

  return `http://i3.ytimg.com/vi/${v}/2.jpg`;
};

export default {
  title: "YouTube Video",
  name: "youtubeVideo",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "URL",
      name: "url",
      type: "url",
      validation: Rule =>
        Rule.required().error("A YouTube video url is required."),
    },
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
    },
    prepare: ({ title, url }) => {
      let media;
      const src = getYoutubeThumbnailSrc(url);
      if (src) {
        media = src;
      }
      return {
        title,
        subtitle: "YouTube video",
        media: <img src={src} />,
      };
    },
  },
};
