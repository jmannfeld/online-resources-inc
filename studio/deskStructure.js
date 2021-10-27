import S from '@sanity/desk-tool/structure-builder'
import { BiCog } from 'react-icons/bi'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
  !['page', 'route', 'site-config', 'manufacturer', 'product', 'product-category'].includes(
    listItem.getId()
  )

export default () =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Site config')
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
        .title('Product Categories')
        .schemaType('product-category')
        .child(S.documentTypeList('product-category').title('Product Categories')),
      S.listItem()
        .title('Manufacturers')
        .schemaType('manufacturer')
        .child(S.documentTypeList('manufacturer').title('Manufacturers')),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
