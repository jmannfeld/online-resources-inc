import { BiDollarCircle, BiDollar, BiBarcodeReader } from 'react-icons/bi';
import PriceInput from '../custom-inputs/PriceInput';
import PercentageInput from '../custom-inputs/PercentageInput';

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
    },
    {
      title: 'Discount information',
      name: 'discount-information',
      description: 'Discount information related to selling this product'
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
    },
    {
      title: 'Add discount',
      name: 'addDiscount',
      type: 'boolean',
      fieldset: 'discount-information'
    },
    {
      title: 'Percentage off',
      name: 'discount',
      type: 'string',
      description: 'Discount applied to other accessories purchased with this product',
      inputComponent: PercentageInput,
      fieldset: 'discount-information',
      hidden: ({ document }) => !document.addDiscount,
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
    },
    {
      title: 'Discounted products',
      name: 'discountedProducts',
      type: 'array',
      fieldset: 'discount-information',
      hidden: ({ document }) => !document.addDiscount,
      of: [
        {
          type: 'reference',
          to: [{ type: 'product-accessory' }]
        }
      ]
    }
  ]
};
