import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputField from '../../../../components/Form-controls/Input-field';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from '../../../../components/Form-controls/PasswordField';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor : theme.palette.secondary.main,

    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(2,0,2,0)
    },
    submit: {

    },
    progress : {
        position: 'absolute',
        top: theme.spacing(1),
        left: 0,
        right: 0,
    }
}));

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};



function RegisterForm(props) {
    const classes = useStyles();

    const schema = yup.object().shape({
        fullName: yup
        .string()
        .required('please enter your name !')
        .test('should has at least two words' , 'please enter at least two words !'
        , (value) => {
            return value.split(' ').length >= 2;
        }),

        email : yup
        .string()
        .required('please enter your email !')
        .email('plese enter email ! '),
        
        password : yup
        .string()
        .required('please enter your password !')
        .min(6,'please enter at least 6 characters'),


        retypePassword : yup 
        .string()
        .required('please enter your password ')
        .oneOf([yup.ref('password')],'Password not match')
      });


    const form = useForm({
        defaultValues: {
            fullName:'',
            email:'',
            password:'',
            retypePassword:''
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = async (values) => {
       const {onSubmit} = props;
       if (onSubmit) {
       await onSubmit(values);
       }
    }

    const {isSubmitting} = form.formState;

    return (
        <div
            style={{minWidth: 400}}
            className={classes.root}>
            
             {/* // loading */}
             {isSubmitting && <LinearProgress className={classes.progress} /> }

            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography component="h3" variant="h5" className={classes.title} >
                Create an account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)} >
            <InputField name="fullName" lable="Full Name" form={form} />
            <InputField name="email" lable="Email" form={form} />
            <PasswordField name="password" lable="Password" form={form} />
            <PasswordField name="retypePassword" lable="Retype Password" form={form} />
            <Button
            disabled={isSubmitting}
            type='submit'
            variant='contained'
            color='secondary' 
            fullWidth > 
                Create 
            </Button>
            </form>
           
        </div>
    );
}

export default RegisterForm;