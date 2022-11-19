import { BiListOl } from 'react-icons/bi';

export default {
  title: 'Signup Form',
  name: 'signupForm',
  type: 'object',
  icson: BiListOl,
  fields: [
    {
      title: 'Select form',
      name: 'name',
      type: 'string',
      options: {
        list: ['Garage Night Registration Form']
      }
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
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
        subtitle: 'Signup form component'
      };
    }
  }
};
