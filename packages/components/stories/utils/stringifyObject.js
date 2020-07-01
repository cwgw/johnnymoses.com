import stringifyObject from "stringify-object";

export default o => {
  return stringifyObject(o, {
    indent: "  ",
    singleQuotes: false,
  });
};
