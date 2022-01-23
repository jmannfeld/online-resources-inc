import bcp47 from 'bcp47';
import { BiCog } from 'react-icons/bi';

export default {
  title: 'Site Configuration',
  name: 'site-config',
  type: 'document',
  icon: BiCog,
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fieldsets: [
    { title: 'Site settings', name: 'site-settings' },
    { title: 'Layout', name: 'layout' },
    { title: 'Footer', name: 'footer' },
    { title: 'Business info', name: 'business-info' }
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
      fieldset: 'business-info'
    },
    {
      title: 'Phone number',
      name: 'phone',
      type: 'string',
      fieldset: 'business-info'
    },
    {
      title: 'Address',
      name: 'address',
      type: 'address'
    },
    {
      title: 'Google Maps embed',
      name: 'googleMapsUrl',
      type: 'embedHTML'
    },
    {
      title: 'Sales email',
      name: 'salesEmail',
      type: 'string',
      fieldset: 'business-info'
    },
    {
      title: 'Technical support email',
      name: 'supportEmail',
      type: 'string',
      fieldset: 'business-info'
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
        Rule.max(6).warning('Are you sure you want more than 6 items?'),
        Rule.unique().error('You have duplicate menu items')
      ],
      of: [
        {
          type: 'reference',
          to: [{ type: 'route' }]
        },
        {
          title: 'External URL',
          type: 'externalUrl'
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
        },
        {
          title: 'External URL',
          type: 'externalUrl'
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
};
