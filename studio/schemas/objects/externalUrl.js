import { BiWindow } from 'react-icons/bi';

export default {
  title: 'External URL',
  name: 'externalUrl',
  type: 'object',
  icon: BiWindow,
  fields: [
    {
      title: 'Navbar text',
      name: 'navText',
      type: 'string'
    },
    {
      title: 'URL to link to',
      name: 'url',
      type: 'url'
    }
  ],
  preview: {
    select: {
      url: 'url',
      navText: 'navText'
    },
    prepare({ url, navText }) {
      return {
        title: url,
        subtitle: `External Page: ${navText}`
      };
    }
  }
};
