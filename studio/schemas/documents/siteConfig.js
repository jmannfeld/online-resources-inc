import bcp47 from 'bcp47'

export default {
  title: 'Site configuration',
  name: 'site-config',
  type: 'document',
  // https://www.sanity.io/docs/experimental/ui-affordances-for-actions
  __experimental_actions: [/* 'create', 'delete', */ 'update', 'publish'],
  fieldsets: [{ name: 'footer', title: 'Footer' }],
  fields: [
    {
      title: 'Site title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url'
    },
    {
      name: 'frontpage',
      type: 'reference',
      description: 'Choose page to be the frontpage',
      to: { type: 'page' }
    },
    {
      title: 'Site language',
      name: 'lang',
      type: 'string',
      description:
        'Should be a valid bcp47 language code like en, en-US, no or nb-NO',
      validation: Rule =>
        Rule.custom(lang =>
          bcp47.parse(lang) ? true : 'Please use a valid bcp47 code'
        )
    },
    {
      title: 'Brand logo',
      name: 'logo',
      type: 'logoImageBlock',
    },
    {
      title: 'Main navigation',
      name: 'mainNavigation',
      type: 'array',
      description: 'Select pages for the top menu',
      validation: Rule => [
        Rule.max(5).warning('Are you sure you want more than 5 items?'),
        Rule.unique().error('You have duplicate menu items')
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'route' }]
        }
      ]
    },
    {
      title: 'Footer navigation items',
      name: 'footerNavigation',
      type: 'array',
      validation: Rule => [
        Rule.max(10).warning('Are you sure you want more than 10 items?'),
        Rule.unique().error('You have duplicate menu items')
      ],
      fieldset: 'footer',
      of: [
        {
          type: 'reference',
          to: [{ type: 'route' }]
        }
      ]
    },
    {
      name: 'footerText',
      type: 'simplePortableText',
      fieldset: 'footer'
    }
  ]
}
