import { BiDollarCircle, BiDollar, BiBarcodeReader } from 'react-icons/bi';
import PriceInput from '../custom-inputs/PriceInput';

export default {
  title: 'Accessory Group',
  name: 'product-accessory-group',
  type: 'document',
  icon: BiBarcodeReader,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Information text',
      name: 'informationText',
      type: 'string'
    },
    {
      title: 'Related accessories',
      name: 'relatedAccessories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'product-accessory'
            }
          ]
        }
      ]
    }
  ]
};
