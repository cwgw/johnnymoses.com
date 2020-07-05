/**
 * If no options have been set for a product,
 * it will have a default option of the following shape:
 * { name: "Title", values: [ "Default Title" ] }
 */
const isNotDefaultOption = o => {
  if (typeof o === "string") {
    return o !== "Default Title";
  }

  const { name, value, values } = o;

  if (value) {
    return !(name === "Title" && value === "Default Title");
  }

  return !(
    name === "Title" &&
    values.length === 1 &&
    values[0] === "Default Title"
  );
};

export default isNotDefaultOption;
