import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';

Login.propTypes = {
    closeDialog : PropTypes.func,
}


function Login(props) {
    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

   const handleSubmit = async(value) => {

    try {

    const action = login(value);
    const resultAction = await dispatch(action);
     unwrapResult(resultAction);

        //close Dialog
        const {closeDialog} = props;
        if (closeDialog) {
            closeDialog();
        }
    } catch (error) {
        console.log('failed to login :',error);
    enqueueSnackbar(error.message ,{variant:'error'});

    }
   }
    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;