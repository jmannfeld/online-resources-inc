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
              title: 'Netlify deploys',
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when new documents are published.',
              sites: [
                {
                  title: 'ORI Frontend Website',
                  name: 'online-resources-inc',
                  apiId: '3e2ddf18-283f-4d44-bf05-8e965bea7b03',
                  buildHookId: '616c634961d550b9f3ea1e84'
                },
                {
                  title: 'Content Studio',
                  name: 'online-resources-inc-studio',
                  apiId: '02030bf6-caed-43b9-914e-d8aad96c9572',
                  buildHookId: '616c634927b0871b32b7a872'
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
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 10,
        types: ['page', 'product', 'product-category']
      },
      layout: { width: 'medium' }
    }
  ]
};
