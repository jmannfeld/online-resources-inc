import { BiNote } from 'react-icons/bi';

export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: BiNote,
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata'
    }
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Page sections',
      name: 'content',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'textSection' },
        { type: 'textSectionSplit' },
        { type: 'imageSection' },
        { type: 'youtubeEmbed' },
        { type: 'productList' },
        { type: 'industryList' },
        { type: 'benefits' },
        { type: 'teamList' },
        { type: 'serviceForm' },
        { type: 'contactForm' },
        { type: 'companyContact' }
      ]
    },
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: ['Full-width', '2 columns'],
        layout: 'radio',
        direction: 'horizontal',
        default: 'Full-width'
      }
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      description: 'This description populates meta-tags on the webpage',
      fieldset: 'metadata'
    },
    {
      title: 'Open graph image',
      name: 'openGraphImage',
      type: 'image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'openGraphImage'
    }
  }
};
