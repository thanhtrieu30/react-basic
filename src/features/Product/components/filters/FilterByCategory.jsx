import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import categoryApi from '../../../../Api/categoryApi';

FilterByCategory.propTypes = {
    onChange:PropTypes.func,
};

const useStyle = makeStyles (theme => ({
    root: {
        padding: theme.spacing(2),
    },

    menu: {
        padding:0,
        margin:0,
        listStyleType: 'none',
        '& > li' : {
            marginTop: theme.spacing(1),
            transition:'all .25s',
            '&:hover': {
                cursor:'pointer',
                color: theme.palette.primary.dark
            }
        }
    }
})

)
function FilterByCategory({onChange}) {
     const classes= useStyle();

        const [categoryList,setCategoryList] = useState([])

        useEffect(()=>{
            (async ()=> {
                try {
                    const list = await categoryApi.getAll();
                    setCategoryList(list.map(x => ({
                        id: x.id,
                        name:x.name
                    })))
                } catch (error) {
                    console.log('error',error);
                }
            })()
        },[])

        const handleCategoryClick = (category) => {
            if (onChange) {
                onChange(category.id)
            }
        }

    return (
        <Box className={classes.root}>
            <Typography variant='subtitle2'>
                Danh mục sản phẩm
            </Typography>

            <ul className={classes.menu}>
                {   
                    categoryList.map(category => (
                        <li key={category.id} onClick={() => handleCategoryClick(category)}>
                            <Typography variant='body2'>
                            {category.name}
                            </Typography>
                            </li>

                    ))
                }
            </ul>
        </Box>
    );
}

export default FilterByCategory;