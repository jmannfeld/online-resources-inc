import { BiDollarCircle, BiDollar, BiBarcodeReader } from 'react-icons/bi';
import PriceInput from '../custom-inputs/PriceInput';

export default {
  title: 'Accessory',
  name: 'product-accessory',
  type: 'document',
  icon: BiBarcodeReader,
  fieldsets: [
    {
      title: 'Price information',
      name: 'price-information',
      options: {
        columns: 2
      },
      description: 'All price information is required to sell this product'
    }
  ],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Item price',
      name: 'price',
      type: 'string',
      description: 'Price of the product in USD',
      inputComponent: PriceInput,
      fieldset: 'price-information',
      validation: Rule =>
        Rule.custom((price, context) => {
          const priceIsRequired = context.document.acceptPaypal;
          if (
            priceIsRequired &&
            (context.document.price === '' || context.document.price === undefined)
          ) {
            return 'A price is required if you want to sell this product on the public website';
          }
          return true;
        })
    },
    {
      title: 'Shipping',
      name: 'shipping',
      type: 'string',
      description: 'Cost of shipping the product in USD',
      inputComponent: PriceInput,
      fieldset: 'price-information',
      validation: Rule =>
        Rule.custom((price, context) => {
          const priceIsRequired = context.document.acceptPaypal;
          if (
            priceIsRequired &&
            (context.document.shipping === '' || context.document.shipping === undefined)
          ) {
            return 'A shipping price is required if you want to sell this product on the public website';
          }
          return true;
        })
    }
  ]
};
