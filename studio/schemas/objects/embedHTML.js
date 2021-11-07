import React from 'react'

const HTMLpreview = ({ value }) => (
  // eslint-disable-next-line
  <div dangerouslySetInnerHTML={{ __html: value.html }} />
)

export default {
  title: 'Embed HTML',
  name: 'embedHTML',
  type: 'object',
  fields: [
    {
      title: 'HTML',
      name: 'html',
      type: 'text',
      options: {
        language: 'html'
      }
    }
  ],
  preview: {
    select: {
      html: 'html'
    },
    component: HTMLpreview
  }
}
