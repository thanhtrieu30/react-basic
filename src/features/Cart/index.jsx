import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from './Seletors';

CartFeature.propTypes = {
    
};

function CartFeature(props) {
    const cartTotal = useSelector(cartTotalSelector)
    return (
        <div>
            {cartTotal}
        </div>
    );
}

export default CartFeature;