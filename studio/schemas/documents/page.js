import {
  BiIdCard,
  BiGridHorizontal,
  BiGridVertical,
  BiImage,
  BiListOl,
  BiMovie,
  BiNote,
  BiText
} from 'react-icons/bi';

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
        { type: 'hero', icon: BiImage },
        { type: 'textSection', icon: BiText },
        { type: 'textSectionSplit', icon: BiText },
        { type: 'imageSection', icon: BiImage },
        { type: 'youtubeEmbed', icon: BiMovie },
        { type: 'productList', icon: BiGridVertical },
        { type: 'industryList', icon: BiGridHorizontal },
        { type: 'benefits', icon: BiGridHorizontal },
        { type: 'teamList', icon: BiGridVertical },
        { type: 'contactForm', icon: BiListOl },
        { type: 'serviceForm', icon: BiListOl },
        { type: 'signupForm', icon: BiListOl },
        { type: 'companyContact', icon: BiIdCard }
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
