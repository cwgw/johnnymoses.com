exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageTemplate = require.resolve("./src/templates/page");
  const productTemplate = require.resolve("./src/templates/product");
  const { data, errors } = await graphql(`
    {
      allSanityPage {
        edges {
          node {
            id
            content {
              main {
                slug {
                  current
                }
              }
            }
          }
        }
      }
      allSanityProduct {
        edges {
          node {
            id
            content {
              main {
                slug {
                  current
                }
              }
            }
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  const pages = data.allSanityPage.edges || [];
  pages.forEach(({ node }) => {
    const slug = node.content.main.slug.current;
    const path = `/${slug === "home" ? "" : slug}`;
    createPage({
      path,
      component: pageTemplate,
      context: {
        id: node.id,
      },
    });
  });

  const products = data.allSanityProduct.edges || [];
  products.forEach(({ node }) => {
    const slug = node.content.main.slug.current;
    const path = `/store/${slug}`;
    createPage({
      path,
      component: productTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
