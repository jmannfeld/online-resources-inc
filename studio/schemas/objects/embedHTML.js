import React from 'react';

const HTMLpreview = ({ value }) => (
  // eslint-disable-next-line
  <div dangerouslySetInnerHTML={{ __html: value.html }} />
);

export default {
  title: 'Embed HTML',
  name: 'embedHTML',
  type: 'object',
  fields: [
    {
      title: 'HTML',
      name: 'html',
      type: 'text',
      description:
        'You usually want to avoid storing freeform HTML, but for embed codes it can be useful.',
      options: {
        language: 'html',
      },
    },
  ],
  preview: {
    select: {
      html: 'html',
    },
    component: HTMLpreview,
  },
};
