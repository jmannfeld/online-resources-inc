export default {
  title: 'Company Contact',
  name: 'companyContact',
  type: 'object',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    }
  ],
  preview: {
    select: {
      name: 'name'
    },
    prepare({ name }) {
      return {
        title: name,
        subtitle: 'Company contact component'
      };
    }
  }
};
