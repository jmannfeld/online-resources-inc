import { BiFile } from 'react-icons/bi'

export default {
  title: 'Customer Review',
  name: 'customer-review',
  type: 'document',
  icon: BiFile,
  fields: [
    {
      title: 'Reviewer Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Reviewer Title/Company',
      name: 'title',
      type: 'string',
      description: '(optional)'
    },
    {
      title: 'Review',
      name: 'review',
      type: 'string',
      description: 'Enter text only. No quotes needed'
    },
    {
      title: 'Public',
      name: 'public',
      type: 'boolean',
      description: 'Display this customer review on the public website'
    }
  ],
  preview: {
    select: {
      title: 'name',
      review: 'review'
    },
    prepare({ title, review }) {
      return {
        title,
        subtitle: review ? `"${review.substr(0, 25)}"` : ''
      }
    }
  }
}
