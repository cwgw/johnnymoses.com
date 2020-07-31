import * as pageBlocks from "../page-blocks";

const pageBlockTypes = Object.values(pageBlocks).map(({ name }) => ({
  type: name,
}));

export default {
  // title: "Module Content",
  name: "moduleContent",
  type: "array",
  of: pageBlockTypes,
};
