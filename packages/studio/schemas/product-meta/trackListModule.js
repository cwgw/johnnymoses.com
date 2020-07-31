export default {
  title: "Track List",
  name: "trackListModule",
  type: "object",
  fields: [
    {
      title: "Tracks",
      name: "tracks",
      type: "array",
      of: [{ type: "track" }],
    },
  ],
  preview: {
    select: {
      tracks: "tracks",
    },
    prepare: ({ tracks }) => {
      return {
        title: "Track List",
        subtitle: tracks ? `${tracks.length} tracks` : "No tracks",
      };
    },
  },
};
