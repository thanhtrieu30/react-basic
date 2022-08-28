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

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};



function LoginForm(props) {
    const classes = useStyles();

    const schema = yup.object().shape({
        

        identifier : yup
        .string()
        .required('please enter your email !')
        .email('plese enter email ! '),
        
        password : yup
        .string()
        .required('please enter your password !')
        


      
      });


    const form = useForm({
        defaultValues: {
            
            identifier:'',
            password:'',
           
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
            Sign in
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)} >
            <InputField name="identifier" lable="Email" form={form} />
            <PasswordField name="password" lable="Password" form={form} />
            <Button
            disabled={isSubmitting}
            type='submit'
            variant='contained'
            color='secondary' 
            fullWidth > 
                Sign in
            </Button>
            </form>
           
        </div>
    );
}

export default LoginForm;