export default {
  title: 'Text (split)',
  name: 'textSectionSplit',
  type: 'object',
  fields: [
    {
      title: 'Label (Section 1)',
      name: 'label1',
      type: 'string'
    },
    {
      title: 'Heading (Section 1)',
      name: 'heading1',
      type: 'string'
    },
    {
      title: 'Text (Section 1)',
      name: 'text1',
      type: 'portableText'
    },
    {
      title: 'Label (Section 2)',
      name: 'label2',
      type: 'string'
    },
    {
      title: 'Heading (Section 2)',
      name: 'heading2',
      type: 'string'
    },
    {
      title: 'Text (Section 2)',
      name: 'text2',
      type: 'portableText'
    }
  ],
  preview: {
    select: {
      heading1: 'heading1',
      heading2: 'heading2'
    },
    prepare({ heading1, heading2 }) {
      return {
        title: `${heading1 ? heading1 : ''} | ${heading2 ? heading2 : ''}`,
        subtitle: 'Text section (split)'
      };
    }
  }
};
