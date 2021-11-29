export default {
  title: 'Contact Form',
  name: 'contactForm',
  type: 'object',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form',
        subtitle: 'Contact form component'
      };
    }
  }
};
