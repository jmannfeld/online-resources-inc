export default {
  title: 'Meet the Team',
  name: 'teamList',
  type: 'object',
  fields: [
    {
      title: 'Subheading',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Team members',
      name: 'members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'team-member'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Meet the Team',
        subtitle: 'Team list component'
      };
    }
  }
};
