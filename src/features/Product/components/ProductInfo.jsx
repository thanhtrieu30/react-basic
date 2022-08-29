import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from '../../../utils';

ProductInfo.propTypes = {
    product : PropTypes.object,
};

const useStyle = makeStyles( theme => ({
    root: {
        paddingBottom: theme.spacing(2),
        borderBottom: `2px solid ${theme.palette.grey[100]}`
    },

    desciption: {
       margin: theme.spacing(2,0)
    },
    salePrice: {
        marginRight: theme.spacing(3),
        fontSize: theme.typography.h4.fontSize,
        fontWeight: ' bold'
    },
    priceBox : {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.grey[100],
    },
    originalPrice:{
        padding: theme.spacing(2),
        textDecoration: 'line-through',
    },
   
}))

function ProductInfo({product = {}}) {
    const classes = useStyle();

    const { name , shortDescription , salePrice , originalPrice , promotionPercent } = product;
    return (
        <Box className={classes.root}>
            <Typography component="h1" variant='h4'>{name}</Typography>
            <Typography variant='body2' className={classes.desciption}>{shortDescription}</Typography>
            <Box className={classes.priceBox}>
                <Box component="span" className={classes.salePrice}>{formatPrice(salePrice) }</Box>
                <Box component="span" className={classes.originalPrice}>{formatPrice(originalPrice)}</Box>
                <Box component="span">{`-${promotionPercent}%`}</Box>
            </Box>
        </Box>
    );
}

export default ProductInfo;