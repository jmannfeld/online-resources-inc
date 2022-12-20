import React from 'react';

import { PatchEvent, set } from 'part:@sanity/form-builder/patch-event';
import FormField from 'part:@sanity/components/formfields/default';

import { TextInput } from '@sanity/ui';

export const PercentageInput = React.forwardRef((props, ref) => {
  const { type, onChange } = props;
  return (
    <FormField label={type.title} description={type.description}>
      <TextInput
        type="number"
        ref={ref}
        placeholder={type.placeholder}
        icon={React.createElement('div', null, '%')}
        value={props.value}
        onChange={event => {
          onChange(PatchEvent.from(set(event.target.value)));
        }}
      />
    </FormField>
  );
});

// Create the default export to import into our schema
export default PercentageInput;
