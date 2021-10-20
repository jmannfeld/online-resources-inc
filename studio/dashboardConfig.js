export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '616c634927b0871b32b7a872',
                  title: 'Sanity Studio',
                  name: 'online-resources-inc-studio',
                  apiId: '02030bf6-caed-43b9-914e-d8aad96c9572'
                },
                {
                  buildHookId: '616c634961d550b9f3ea1e84',
                  title: 'Landing pages Website',
                  name: 'online-resources-inc',
                  apiId: '3e2ddf18-283f-4d44-bf05-8e965bea7b03'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/jmannfeld/online-resources-inc',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://online-resources-inc.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page', 'product'] },
      layout: { width: 'medium' }
    }
  ]
}
