export default {
  title: 'Image with text',
  name: 'imageSection',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Label',
      name: 'label',
      type: 'string',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'simplePortableText',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'figure',
    },
    {
      title: 'Call to action',
      name: 'cta',
      type: 'cta',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
      subtitle: 'label',
      media: 'image',
    },
    prepare({ heading, media }) {
      return {
        title: `Image: ${heading}`,
        subtitle: 'Image section',
        media,
      };
    },
  },
};
