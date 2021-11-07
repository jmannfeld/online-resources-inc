import { BiUser } from 'react-icons/bi'

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
      title: 'Bio',
      name: 'bio',
      type: 'text'
    },
    {
      title: 'Headshot',
      name: 'headshot',
      type: 'image'
    }
  ]
}
