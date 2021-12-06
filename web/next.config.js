const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const client = require('./client');

const isProduction = process.env.NODE_ENV === 'production';
const routeQuery = `
{
  "routes": *[_type == "route"] {
    ...,
    disallowRobot,
    includeInSitemap,
    page->{
      _id,
      title,
      _createdAt,
      _updatedAt
  }}
}
`;
const productQuery = `
*[_type == "product" && public] {
  slug {
    current
  }
}.slug.current
`;

const reduceRoutes = (obj, route) => {
  const { page = {}, slug = {} } = route;
  const { _createdAt, _updatedAt } = page;
  const { includeInSitemap, disallowRobot } = route;
  const path = route['slug']['current'] === '/' ? '/' : `/${route['slug']['current']}`;
  obj[path] = {
    query: {
      slug: slug.current
    },
    includeInSitemap,
    disallowRobot,
    _createdAt,
    _updatedAt,
    page: '/LandingPage'
  };
  return obj;
};

// const getBlogPostEntries = async (client) => {
//   const entries = await client.getEntries({
//     content_type: 'blogPost',
//     order: 'fields.date'
//   });
//   return entries;
// };

module.exports = withImages(
  withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: isProduction ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
      url: false
    },
    exportPathMap: async function () {
      const products = await client.fetch(productQuery).then((res) => {
        const productArray = res;
        return productArray;
      });

      return client.fetch(routeQuery).then((res) => {
        const { routes = [] } = res;
        const nextRoutes = {
          // '/products/slug': { page: '/products/ProductPage' },
          // Routes imported from sanity
          ...routes.filter(({ slug }) => slug.current).reduce(reduceRoutes, {})
        };
        // '/admin': { page: '/AdminPage' }

        // Routes for product pages
        products.forEach((slug) => {
          nextRoutes[`/products/${slug}`] = {
            page: '/products/ProductPage',
            query: { slug: slug },
            includeInSitemap: true
          };
        });
        console.log('nextRoutes', nextRoutes);
        return nextRoutes;
      });
    }
  })
);
