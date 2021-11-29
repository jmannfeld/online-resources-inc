export default {
  title: 'Gallery Image',
  name: 'galleryImage',
  type: 'image',
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      options: {
        isHighlighted: true // <-- make this field easily accessible
      }
    }
  ]
};
