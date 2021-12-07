export default {
  title: 'Industry List',
  name: 'industryList',
  type: 'object',
  fields: [
    {
      title: 'Subheading',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Industries',
      name: 'industries',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'industry'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Industries we serve',
        subtitle: 'Industry list component'
      };
    }
  }
};
