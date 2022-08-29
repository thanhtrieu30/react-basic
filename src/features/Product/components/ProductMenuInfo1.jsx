import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';

ProductMenuInfo1.propTypes = {
    
};

function ProductMenuInfo1({product ={}}) {
    const safeDescription = DOMPurify.sanitize(product.description);
    return (
        <Paper elevation={0} style={{padding: '15px'}}>
            <div dangerouslySetInnerHTML={{__html: safeDescription }} />
        </Paper>
    );
}

export default ProductMenuInfo1;