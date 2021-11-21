const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const client = require('./client')

const isProduction = process.env.NODE_ENV === 'production'
const query = `
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
`
const reduceRoutes = (obj, route) => {
  const {page = {}, slug = {}} = route
  const {_createdAt, _updatedAt} = page
  const {includeInSitemap, disallowRobot} = route
  const path = route['slug']['current'] === '/' ? '/' : `/${route['slug']['current']}`
  obj[path] = {
    query: {
      slug: slug.current
    },
    includeInSitemap,
    disallowRobot,
    _createdAt,
    _updatedAt,
    page: '/LandingPage'
  }
  return obj
}

module.exports = withPlugins(
  [
    [withImages, { /* plugin config here ... */ }],
    [withCSS,  { 
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: isProduction ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]'
      },
      webpack: function (config) {
        config.module.rules.push({
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        })
        return config
      },
      exportPathMap: function () {
        return client.fetch(query).then(res => {
          const {routes = []} = res
          const nextRoutes = {
            // Routes imported from sanity
            ...routes.filter(({slug}) => slug.current).reduce(reduceRoutes, {}),
            '/custom-page': {page: '/CustomPage'}
          }
          return nextRoutes
        })
      }
    }],
    [withFonts, {}],
  ],
  {
    /* global config here ... */
  },
);