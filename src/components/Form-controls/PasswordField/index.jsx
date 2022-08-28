import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@material-ui/core';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    lable:PropTypes.string,
    disabled:PropTypes.bool
};

function PasswordField(props) {
    const {form , lable , name , disabled} = props;
    const {errors, } = form; 
    const hasError = !!errors[name];
    

    const [showPassword , setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    }
    return (
        
        <FormControl error={hasError} fullWidth margin='normal' variant="outlined">
          <InputLabel htmlFor={name}>{lable}</InputLabel>
          <Controller
            name={name}
            control={form.control}
            as={OutlinedInput}
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={lable}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            disabled={disabled}
           
          />
          <FormHelperText  > {errors[name]?.message}</FormHelperText>
        </FormControl>
    
    );
}

export default PasswordField;