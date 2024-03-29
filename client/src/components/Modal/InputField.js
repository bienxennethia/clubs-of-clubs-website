import { useState } from 'react';

import { useCommonState } from '../../data/commonState';

const InputField = ({ field }) => {
  const { handleField } = useCommonState();
  const [value, setValue] = useState(field.value || '');

  const handleChange = (e) => {
    setValue(e.target.value);
    handleField(e);
  };

  const inputProps = {
    className: "fields-modal__input",
    name: field.name,
    placeholder: field.placeholder,
    required: field.required,
    value: field.type === 'file' ? '' : value,
    onChange: (e) => handleChange(e),
  };

  return field.type === 'textarea' ? (
    <textarea {...inputProps} />
  ) : (
    <input type={field.type} {...inputProps} {...(field.type === 'file' ? { accept: 'image/*' } : {})}  />
  );
};

export default InputField;
