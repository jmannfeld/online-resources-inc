import { MdLink } from "react-icons/md";

export default {
  title: 'Route',
  name: 'route',
  type: 'document',
  icon: MdLink,
  fields: [
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
    },
    {
      name: 'page',
      type: 'reference',
      description: 'Select the page that this route should point to',
      to: [
        {
          type: 'page',
        },
      ],
    },
    {
      title: 'Include page in sitemap',
      name: 'includeInSitemap',
      type: 'boolean',
      description: 'For search engines. Will be added to /sitemap.xml',
    },
    {
      title: 'Disallow in robots.txt',
      name: 'disallowRobots',
      type: 'boolean',
      description: 'Hide this route for search engines',
    },
  ],
  preview: {
    select: {
      slug: 'slug.current',
      pageTitle: 'page.title',
    },
    prepare({ slug, pageTitle }) {
      return {
        title: slug === '/' ? '/' : `/${slug}`,
        subtitle: `Page: ${pageTitle}`,
      };
    },
  },
};
