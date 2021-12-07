import { BiWorld } from 'react-icons/bi';

export default {
  title: 'Industry',
  name: 'industry',
  type: 'document',
  icon: BiWorld,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'simplePortableText'
    },
    {
      title: 'Display image',
      name: 'image',
      type: 'image'
    }
  ]
};
