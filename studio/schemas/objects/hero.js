export default {
  type: 'object',
  name: 'hero',
  title: 'Hero',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Tagline',
      name: 'tagline',
      type: 'simplePortableText',
    },
    {
      title: 'Background image',
      name: 'backgroundImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Call to actions',
      name: 'ctas',
      type: 'array',
      of: [
        {
          title: 'Call to action',
          type: 'cta',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Hero section',
        media,
      };
    },
  },
};
