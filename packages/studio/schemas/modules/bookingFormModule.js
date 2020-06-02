export default {
  title: "Booking Form",
  name: "bookingFormModule",
  type: "object",
  fields: [
    {
      title: "Accompanying Text",
      name: "text",
      type: "blockContent",
    },
  ],
  preview: {
    select: {},
    prepare: () => {
      return Object.assign(
        {},
        {
          title: "Booking Form",
        }
      );
    },
  },
};
