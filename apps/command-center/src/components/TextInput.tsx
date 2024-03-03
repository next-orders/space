'use client';

import React from 'react';

type Props = {
  value: string;
  label: string;
  placeholder: string;
};

export const TextInput = ({ value, label, placeholder }: Props) => {
  const [name, setName] = React.useState(value);

  return (
    <div className="mb-2">
      <label htmlFor="product-name" className="block font-medium">
        {label}
      </label>
      <input
        id="product-name"
        type="text"
        name="name"
        className="px-2 py-2 w-full rounded-xl"
        placeholder={placeholder}
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
    </div>
  );
};
