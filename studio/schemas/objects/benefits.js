export default {
  title: '3D Benefits',
  name: 'benefits',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    }
  ],
  preview: {
    prepare() {
      return {
        title: '3D Benefits',
        subtitle: 'Benefit list component'
      };
    }
  }
};
