import bcp47 from 'bcp47'

export default {
  title: 'Site configuration',
  name: 'site-config',
  type: 'document',
  fieldsets: [
    { title: 'Site settings', name: 'site-settings' },
    { title: 'Layout', name: 'layout' },
    { title: 'Footer', name: 'footer' },
    { title: 'Business settings', name: 'business-settings' }
  ],
  fields: [
    {
      title: 'Site title',
      name: 'title',
      type: 'string',
      fieldset: 'site-settings'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
      fieldset: 'site-settings'
    },
    {
      title: 'Site language',
      name: 'lang',
      type: 'string',
      description: 'Should be a valid bcp47 language code like en, en-US, no or nb-NO',
      fieldset: 'site-settings',
      validation: Rule =>
        Rule.custom(lang => (bcp47.parse(lang) ? true : 'Please use a valid bcp47 code'))
    },
    {
      title: 'ORI logo',
      name: 'logo',
      type: 'logoImageBlock',
      fieldset: 'business-settings'
    },
    {
      title: 'Phone number',
      name: 'phone',
      type: 'string',
      fieldset: 'business-settings'
    },
    {
      title: 'Main contact email',
      name: 'email',
      type: 'string',
      fieldset: 'business-settings'
    },
    {
      title: 'Social media accounts',
      name: 'socialMedia',
      type: 'socialMedia'
    },
    {
      name: 'frontpage',
      type: 'reference',
      description: 'Choose page to be the frontpage',
      fieldset: 'layout',
      to: { type: 'page' }
    },
    {
      title: 'Main navigation',
      name: 'mainNavigation',
      type: 'array',
      description: 'Select pages for the top menu',
      fieldset: 'layout',
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
      fieldset: 'layout',
      validation: Rule => [
        Rule.max(10).warning('Are you sure you want more than 10 items?'),
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
      title: 'Footer text',
      name: 'footerText',
      type: 'simplePortableText',
      fieldset: 'layout'
    }
  ]
}
