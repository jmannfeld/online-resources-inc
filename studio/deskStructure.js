import S from '@sanity/desk-tool/structure-builder';
import { BiCog, BiFolderOpen } from 'react-icons/bi';

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
  ![
    'customer-review',
    'industry',
    'manufacturer',
    'page',
    'product',
    'product-accessory',
    'product-category',
    'route',
    'site-config',
    'team-member'
  ].includes(listItem.getId());

export default () =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Site Configuration')
        .icon(BiCog)
        .child(
          S.editor()
            .id('config')
            .schemaType('site-config')
            .documentId('global-config')
        ),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Routes')
        .schemaType('route')
        .child(S.documentTypeList('route').title('Routes')),
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products')),
      S.listItem()
        .title('Accessories')
        .schemaType('product-accessory')
        .child(S.documentTypeList('product-accessory').title('Accessories')),
      S.listItem()
        .title('Product Categories')
        .schemaType('product-category')
        .child(S.documentTypeList('product-category').title('Product Categories')),
      S.listItem()
        .title('Manufacturers')
        .schemaType('manufacturer')
        .child(S.documentTypeList('manufacturer').title('Manufacturers')),
      S.listItem()
        .title('Industries')
        .schemaType('industry')
        .child(S.documentTypeList('industry').title('Industries')),
      S.listItem()
        .title('Team Members')
        .schemaType('team-member')
        .child(S.documentTypeList('team-member').title('Team Members')),
      S.listItem()
        .title('Customer Reviews')
        .icon(BiFolderOpen)
        .schemaType('customer-review')
        .child(S.documentTypeList('customer-review').title('Customer Reviews')),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
