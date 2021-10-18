export default {
  type: 'object',
  name: 'mailchimp',
  title: 'Mailchimp newsletter signup',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Subheading',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'URL to Mailchimp signup',
      name: 'actionUrl',
      type: 'url',
      description:
        'URL for the Mailchimp signup form. Remember to add your domain in your mailchimp settings to avoid CORS errors.',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Mailchimp newsletter signup section',
      };
    },
  },
};
