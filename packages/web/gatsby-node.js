const get = require("lodash/get");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageTemplate = require.resolve("./src/templates/page");
  const productTemplate = require.resolve("./src/templates/product");
  const postTemplate = require.resolve("./src/templates/post");
  const { data, errors } = await graphql(`
    {
      sanitySiteGlobal {
        content {
          routes {
            productRouteRoot {
              current
            }
            postRouteRoot {
              current
            }
          }
        }
      }
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
      allSanityPost {
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

  const productPath = get(
    data,
    "sanitySiteGlobal.content.routes.productRouteRoot.current",
    "product"
  );

  const products = data.allSanityProduct.edges || [];
  products.forEach(({ node }) => {
    const slug = node.content.main.slug.current;
    const path = `/${productPath}/${slug}`;
    createPage({
      path,
      component: productTemplate,
      context: {
        id: node.id,
      },
    });
  });

  const postPath = get(
    data,
    "sanitySiteGlobal.content.routes.postRouteRoot.current",
    "news"
  );

  const posts = data.allSanityPost.edges || [];
  posts.forEach(({ node }) => {
    const slug = node.content.main.slug.current;
    const path = `/${postPath}/${slug}`;
    createPage({
      path,
      component: postTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
