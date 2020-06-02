export default {
  title: "Booking Form",
  name: "bookingForm",
  type: "document",
  fields: [
    {
      title: "Fields",
      name: "formFields",
      type: "array",
      of: [
        {
          type: "formField",
        },
      ],
    },
    {
      title: "Submit Button Text",
      name: "submitValue",
      type: "string",
    },
  ],
  preview: {
    select: {},
    prepare() {
      return Object.assign(
        {},
        {
          title: "Booking Form",
        }
      );
    },
  },
};
