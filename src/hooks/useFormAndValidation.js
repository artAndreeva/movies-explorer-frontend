import { useState, useCallback } from 'react';
import validator from 'validator';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value });
    validateFields(name, value);
    setIsValid(!errors.name || errors.name === '');
  };

  const validateFields = (name, value) => {
    if (name === 'movie') {
      validateMovieField(name, value);
    }
    if (name === 'name') {
      validateNameField(name, value);
    }
    if (name === 'email') {
      validateEmailField(name, value);
    }
    if (name === 'password') {
      validatePasswordField(name, value);
    }
  }

  const validateMovieField = (name, value) => {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: 'Нужно ввести ключевое слово' });
    }
  }

  const validateNameField = (name, value) => {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: 'Это поле не может быть пустым' });
    }
    if (value.length < 2) {
      setErrors({ ...errors, [name]: 'Пароль должен быть не менее 2 символов' });
    }
    if (value.length > 30) {
      setErrors({ ...errors, [name]: 'Пароль должен быть не более 30 символов' });
    }
  }

  const validateEmailField = (name, value) => {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: 'Это поле не может быть пустым' });
    }
    if (value.length < 6) {
      setErrors({ ...errors, [name]: 'Пароль должен быть не менее 6 символов' });
    }
    if (value.length > 30) {
      setErrors({ ...errors, [name]: 'Пароль должен быть не более 30 символов' });
    }
    if (!validator.isEmail(value)) {
      setErrors({ ...errors, [name]: 'Неверный формат почты' });
    }
  }

  const validatePasswordField = (name, value) => {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: 'Это поле не может быть пустым' });
    } else if (value.length < 8) {
      setErrors({ ...errors, [name]: 'Пароль должен быть не менее 8 символов' });
    } else if (value.length > 30) {
      setErrors({ ...errors, [name]: 'Пароль должен быть не более 30 символов' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, errors, isValid, setValues, setIsValid, handleChange, resetForm };
}
