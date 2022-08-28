import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';

Register.propTypes = {
    closeDialog : PropTypes.func,
}


function Register(props) {
    const dispatch = useDispatch();

    const {enqueueSnackbar} = useSnackbar();

   const handleSubmit = async(value) => {

    try {
        //auto set username = email
        value.username = value.email;

    const action = register(value);
    const resultAction = await dispatch(action);
     unwrapResult(resultAction);

        //close Dialog
        const {closeDialog} = props;
        if (closeDialog) {
            closeDialog();
        }

    // noti
    enqueueSnackbar('Successfully',{variant:'success'});
    } catch (error) {
        console.log('failed to register :',error);
    enqueueSnackbar(error.message ,{variant:'error'});

    }
   }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;