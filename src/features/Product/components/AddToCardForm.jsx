import PropTypes from 'prop-types';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../components/Form-controls/Input-field';
import { Button } from '@material-ui/core';
import QuantityField from '../../../components/Form-controls/QuantityField';

AddToCardForm.propTypes = {
    onSubmit : PropTypes.func,
};

function AddToCardForm({onSubmit = null}) {
    const schema = yup.object().shape({
        
        quantity : yup
        .number()
        .required('plese enter quatity ! ').min(1,'minimum value is 1').typeError('Please enter a number'),
       
      });


    const form = useForm({
        defaultValues: {
            
            quantity:1,
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = async (values) => {
        if (onSubmit) {
        await onSubmit(values);
        }
     }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} >
            <QuantityField name="quantity" lable="Quantity" form={form} />
           
            <Button
          
            type='submit'
            variant='contained'
            color='secondary' 
            fullWidth > 
               Buy
            </Button>
            </form>
    );
}

export default AddToCardForm;