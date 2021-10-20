const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: '3lsmf2pq',
  dataset: 'production',
  apiVersion: '2021-10-18',
  token: '', // or leave blank to be anonymous user
  useCdn: false // `false` if you want to ensure fresh data
})

module.exports = client
