import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Link } from '@material-ui/core';
import {  NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {
    
};

const useStyle = makeStyles((theme) => (
    {
        root: {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            listStyleType: 'none',

            '& > li' :{
                padding: theme.spacing(2,4),
            },

            '& > li > a' : {
                color: theme.palette.grey[700],
            },
            '& > li > a.active' : {
                color: theme.palette.primary.main,
                textDecoration: 'underline'
            }
        },
    }
));  

function ProductMenu(props) {
    const classes = useStyle();
    const {url} = useRouteMatch()
    return (
        <Box component="ul" className={classes.root}>
            <li>
                <Link component={NavLink} to={url} exact >
                    Desciption
                </Link>
            </li>

            <li>
                <Link component={NavLink} to={`${url}/additional`} exact >
                    Additional Infomation
                </Link>
            </li>

            <li>
                <Link component={NavLink} to={`${url}/review`}  exact>
                    Review
                </Link>
            </li>
        </Box>
    );
}

export default ProductMenu;