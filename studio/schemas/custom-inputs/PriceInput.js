import React from 'react';

import { PatchEvent, set } from 'part:@sanity/form-builder/patch-event';
import FormField from 'part:@sanity/components/formfields/default';

import { TextInput, Stack, Label, Text } from '@sanity/ui';

// export const PriceInput = React.forwardRef((props, ref) => {
//   return (
//     <Stack space={2}>
//       <Text>{props.type.title}</Text>
//       <TextInput ref={ref} value={props.value} icon={React.createElement('div', null, '$')} />
//     </Stack>
//   );
// });

export const PriceInput = React.forwardRef((props, ref) => {
  const { type, onChange } = props;
  return (
    <FormField label={type.title} description={type.description}>
      <TextInput
        type="number"
        ref={ref}
        placeholder={type.placeholder}
        icon={React.createElement('div', null, '$')}
        value={props.value}
        onChange={event => {
          onChange(PatchEvent.from(set(event.target.value)));
        }}
      />
    </FormField>
  );
});

// Create the default export to import into our schema
export default PriceInput;
