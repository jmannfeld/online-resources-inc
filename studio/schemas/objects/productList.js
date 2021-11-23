export default {
    title: 'Product List',
    name: 'productList',
    type: 'object',
    fields: [
      {
          title: 'List name',
          name: 'name',
          type: 'string',
      },
      {
          title: 'Products',
          name: 'products',
          type: 'array',
          of: [
            { 
              type: 'reference',
              to: [
                { 
                  type: 'product'
                }
              ]
            }
          ]
      },
    ],
    preview: {
      select: {
        name: 'name'
      },
      prepare({ name }) {
        return {
          title: `${name} product list`,
          subtitle: 'Product list component',
        };
      },
    },
  };
  