import React, { useEffect } from 'react';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCardForm from '../components/AddToCardForm';
import ProductMenu from '../components/ProductMenu';
import ProductMenuInfo1 from '../components/ProductMenuInfo1';
import ProductMenuInfo2 from '../components/ProductMenuInfo2';
import ProductMenuInfo3 from '../components/ProductMenuInfo3';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Cart/CartSlice';

const useStyle = makeStyles( theme => ({
    root: {},

    left: {
        width: "400px",
        padding: theme.spacing(1.5),
        borderRight: `1px  solid  ${theme.palette.grey[300]}`,
    },
    right: {
        flex: "1 1 0",
        padding: theme.spacing(1.5),
    },
    box:{
        width: "1100px"
    }
    
}))

function DetailPages() {
    const classes = useStyle();
    const {
        params : {productId},
        url
    } = useRouteMatch();
    const {product,loading} = useProductDetail(productId)
    const dispatch = useDispatch();

    if (loading) {
        return <Box>loading...</Box>
    }

    const handleAddToCardSubmit = ({quantity}) => {
        // console.log('Form submit ' , formValue)
        const action = addToCart({
            id: product.id,
            product,
            quantity: quantity
        })
        dispatch(action);
    }
    
    return (
        <Box>
            <Container className={classes.box}>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}><ProductThumbnail product={product} /></Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product}  />
                            <AddToCardForm onSubmit={handleAddToCardSubmit}/>
                        </Grid>
                    </Grid>
                </Paper>

                <ProductMenu />
                <Switch>
                    <Route exact path={url}>
                        <ProductMenuInfo1 product={product} />
                    </Route>

                    <Route  path={`${url}/additional`} component={ProductMenuInfo2}></Route>
                    <Route  path={`${url}/review`} component={ProductMenuInfo3}></Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailPages;