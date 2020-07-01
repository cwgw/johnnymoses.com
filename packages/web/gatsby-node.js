exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageTemplate = require.resolve("./src/templates/page");
  const pagesQueryResult = await graphql(`
    {
      allSanityPage {
        edges {
          node {
            id
            _rawContent(resolveReferences: { maxDepth: 9 })
          }
        }
      }
    }
  `);

  if (pagesQueryResult.errors) {
    throw pagesQueryResult.errors;
  }

  const pages = pagesQueryResult.data.allSanityPage.edges || [];
  pages.forEach(({ node }) => {
    const slug = node._rawContent.main.slug.current;
    const path = `/${slug === "home" ? "" : slug}`;
    createPage({
      path,
      component: pageTemplate,
      context: {
        id: node.id,
        ...node._rawContent
      },
    });
  });
};
