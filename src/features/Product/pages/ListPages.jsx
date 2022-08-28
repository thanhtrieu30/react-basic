import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useState } from 'react';
import { useEffect } from 'react';
import productApi from '../../../Api/product';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

const useStyle = makeStyles( theme => ({
    root: {},

    left: {
        width: "250px"
    },
    right: {
        flex: "1 1 0"
    },
    pagination: {
        display: 'flex',
        flexFlow :'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '20px'
    }
}))

function ListPages(props) {
    const classes = useStyle();
    const [productList , setProductList] = useState([]);
    const [pagination , setPagination] = useState({
        limit:10,
        total: 10,
        page:1,
    });
    const [loading , setLoading] = useState(true);
    const [filters , setFilters] = useState({
        _page: 1, _limit:9, _sort:'salePrice:DESC'
    });



    useEffect(() => {
        (async () => {
            try {
                const {data, pagination} = await productApi.getAll(filters);
                setProductList(data);
                setPagination(pagination)
            } catch (error) {
                console.log('failed',error);
            }
            
            setLoading(false)
        })();
    },[filters]);

    const handlePageChange = (e,page) =>{
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page
        }));
    }

    const handleSortChange = (newSortValue) =>{
        setFilters((prevFilters) => ({
            ...prevFilters,
            _sort: newSortValue
        }));
    }

    const handleFiltersChange = (newFilters) =>{
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters
        }));
    }


    return (
        <Box>
           <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters filters={filters} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
                            {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}



                            <Box className={classes.pagination}>
                            <Pagination 
                            color='primary' 
                            count={Math.ceil(pagination.total / pagination.limit)} 
                            page={pagination.page}
                            onChange={handlePageChange}
                            
                            ></Pagination>
                            </Box>
                            
                            
                        </Paper>

                        
                    </Grid>
                </Grid>
           </Container>
        </Box>
    );
}

export default ListPages;