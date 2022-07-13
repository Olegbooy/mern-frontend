import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister } from "../../redux/slices/auth";
import { Navigate } from 'react-router-dom';


import { selectIsAuth } from '../../redux/slices/auth';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';


import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: ''
    },
    mode: "onChange"
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if(!data.payload) {
      return alert('Не вдалось зареєструватись!');
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  if(isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення акаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажіть повністю своє імя' })}
          className={styles.field} 
          label="Повне ім'я" 
          type="text"
          fullWidth />
        <TextField 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажіть свій email' })}
          className={styles.field} 
          label="E-Mail" 
          type="email"
          fullWidth />
        <TextField 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Введіть новий пароль' })}
          className={styles.field} 
          label="Пароль" 
          type="password"
          fullWidth />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зареєструватись
        </Button>
      </form>
    </Paper>
  );
};
