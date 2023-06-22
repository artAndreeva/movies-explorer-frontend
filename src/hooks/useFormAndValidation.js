import { useState, useEffect, useCallback } from 'react';
import validator from 'validator';
import { regExName } from '../constants/regExName';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value });
    validateFields(name, value);
  };

 useEffect(() => {
  setIsValid(Object.keys(errors).length === 0)
 }, [errors])

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
    } else {
      setErrors((state) => Object.assign({}, Object.keys(state).filter((key) => key !== name)));
    }
  }

  const validateNameField = (name, value) => {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: 'Это поле не может быть пустым' });
    } else if (value.length < 2) {
      setErrors({ ...errors, [name]: 'Имя должено быть не менее 2 символов' });
    } else if (value.length > 30) {
      setErrors({ ...errors, [name]: 'Имя должено быть не более 30 символов' });
    } else if (!regExName.test(value)) {
      setErrors({ ...errors, [name]: 'Неверный формат имени' });
    } else {
      setErrors((state) => Object.assign({}, Object.keys(state).filter((key) => key !== name)));
    }
  }

  const validateEmailField = (name, value) => {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: 'Это поле не может быть пустым' });
    } else if (value.length < 6) {
      setErrors({ ...errors, [name]: 'Почта должена быть не менее 6 символов' });
    } else if (value.length > 30) {
      setErrors({ ...errors, [name]: 'Почта должена быть не более 30 символов' });
    } else if (!validator.isEmail(value)) {
      setErrors({ ...errors, [name]: 'Неверный формат почты' });
    } else {
      setErrors((state) => Object.assign({}, Object.keys(state).filter((key) => key !== name)));
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
      setErrors((state) => Object.assign({}, Object.keys(state).filter((key) => key !== name)));
    }
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, errors, isValid, setValues, setIsValid, handleChange, resetForm };
}
