import React from 'react';
import './FormField.css';

const FormField = ({
  inputClass,
  inputType,
  inputPlaceholder,
  inputName,
  inputId,
  inputValue,
  inputMinLength,
  inputMaxLength,
  handleChange,
  required
}) => {
  return (
    <>
     <input
      className={inputClass}
      type={inputType}
      name={inputName}
      id={inputId}
      value={inputValue}
      minLength={inputMinLength}
      maxLength={inputMaxLength}
      placeholder={inputPlaceholder}
      onChange={handleChange}
      required={required} />
    </>
  );
}

export default FormField;
