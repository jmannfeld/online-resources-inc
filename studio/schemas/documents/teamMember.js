import { BiUser } from 'react-icons/bi';

export default {
  title: 'Team Member',
  name: 'team-member',
  type: 'document',
  icon: BiUser,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Job title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string'
    },
    {
      title: 'Phone number',
      name: 'phone',
      type: 'string'
    },
    {
      title: 'Headshot',
      name: 'headshot',
      type: 'image'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'headshot'
    }
  }
};
