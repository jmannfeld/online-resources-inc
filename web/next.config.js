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

module.exports = withImages(
  withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: isProduction ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
      url: false
    },
    trailingSlash: false,
    env: {
      PAYPAY_CLIENT_ID:
        'AcoQY9r_eNBjFdZWad-rc_vb5ONIPF2t_RZq-vyPUPCGOSLZB86U6HkmQijvmNOuA63YcOglicQ7lEdi' // - ori-sandbox
      // 'Aft-cGY_q99PXLiKu8lBifK5eAHKQun-xFEpO4GJD0YHabzdIbxPUJzo-PszxaaX1Q4mA5qrBte9gs26', // - yahoo
    },
    exportPathMap: async () => {
      const products = await client.fetch(productQuery).then((res) => {
        const productArray = res;
        return productArray;
      });

      return client.fetch(routeQuery).then((res) => {
        const { routes = [] } = res;

        // Import routes for pages created in the Studio
        const nextRoutes = {
          ...routes.filter(({ slug }) => slug.current).reduce(reduceRoutes, {})
        };

        // We can add extra pages here that are not created in the Studio
        // Routes for product pages
        products.forEach((slug) => {
          nextRoutes[`/products/${slug}`] = {
            page: '/products/ProductPage',
            query: { slug: slug },
            includeInSitemap: true
          };
        });

        // '/admin': { page: '/AdminPage' }

        // console.log('nextRoutes', nextRoutes);

        return nextRoutes;
      });
    }
  })
);
