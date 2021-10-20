export default {
  title: "Logo Image Block",
  name: "logoImageBlock",
  type: "object",
  description:
    'Best choice is to use an SVG where the color are set with currentColor',
  fields: [
    {
      title: 'Alternative text',
      name: 'alt',
      type: 'string',
      description: 'Important for SEO and accessiblity.',
      options: {
        isHighlighted: true
      }
    }
  ]
}
