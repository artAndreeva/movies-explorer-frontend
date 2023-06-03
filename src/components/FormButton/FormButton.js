import React from 'react';
import './FormButton.css';

const FormButton = ({ buttonText, buttonClass, disabled }) => {
  return (
    <>
     <button
     className={buttonClass}
     disabled={disabled}
     >
      {buttonText}
    </button>
    </>
  );
}

export default FormButton;
