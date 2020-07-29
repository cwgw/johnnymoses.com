import PasteInput from "../../src/components/inputs/pasteInput";

export default {
  title: "Track List Pastable",
  name: "pastableTrackListModule",
  type: "object",
  fields: [
    {
      title: "Tracks",
      name: "tracks",
      type: "array",
      of: [{ type: "track" }],
    },
  ],
  inputComponent: PasteInput,
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
