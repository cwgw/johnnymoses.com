import { toPlainText } from "../../utils/helpers";

export default {
  title: "YouTube Playlist",
  name: "youtubePlaylistModule",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "blockContent",
    },
    {
      title: "Videos",
      name: "videos",
      type: "array",
      of: [{ type: "youtubeVideo" }],
    },
  ],
  preview: {
    select: {
      text: "text",
    },
    prepare: ({ text }) => {
      const title = toPlainText(text);
      return {
        title: title || "YouTube Playlist",
        subtitle: "YouTube Playlist Section",
      };
    },
  },
};
