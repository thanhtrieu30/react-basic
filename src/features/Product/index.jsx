import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPages from './pages/DetailPages';
import ListPages from './pages/ListPages';

function ProductFeature(props) {
    const match = useRouteMatch();
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListPages} />
                <Route path={`${match.url}/:productId`}  component={DetailPages} />

            </Switch>
        </Box>
    );
}

export default ProductFeature;
