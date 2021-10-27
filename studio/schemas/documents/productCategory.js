import { BiGridAlt } from 'react-icons/bi'

export default {
  title: 'Product Category',
  name: 'product-category',
  type: 'document',
  icon: BiGridAlt,
  fieldsets: [{ name: 'tech-specs', title: 'Tech Specs' }],
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
    // {
    //   title: 'Tech Specs',
    //   name: 'tech_specs2',
    //   type: 'array',
    //   of: [{}]
    // },
    {
      title: 'Accuracy',
      name: 'accuracy',
      type: 'string',
      fieldset: 'tech-specs'
    },
    {
      title: 'Weight',
      name: 'weight',
      type: 'string',
      fieldset: 'tech-specs'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
