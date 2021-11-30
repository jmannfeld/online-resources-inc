export default {
  title: 'Service Form',
  name: 'serviceForm',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Subheading',
      name: 'subheading',
      type: 'string'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Service Form',
        subtitle: 'Service form component'
      };
    }
  }
};
