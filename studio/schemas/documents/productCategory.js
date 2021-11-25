import { BiGridAlt } from 'react-icons/bi'

export default {
  title: 'Product Category',
  name: 'product-category',
  type: 'document',
  icon: BiGridAlt,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'simplePortableText'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
