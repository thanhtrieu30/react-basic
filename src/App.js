// import './App.css';
import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import productApi from './Api/product';
import Header from './components/Header';
import NotFound from './components/Notfound';
import AlbumFeature from './features/Album';
import Counter from './features/Counter';
import ProductFeature from './features/Product';
import TodoFeature from './features/todo';
// import TodoFeature from './features/Todo';


function App() {


  // useEffect(() => {
  //   const fetchProducts = async() => {
  //    const productList = await productApi.getAll();
  //   } 
  //   fetchProducts();
  // }
  
  // ,[])

 




  return (
    <div className="App">
      <Header />
     

    <Switch> 
    
      {/* <Route path="/" component={Counter} exact /> */}
      <Route path="/todo" component={TodoFeature} />
      <Route path="/album" component={AlbumFeature} /> 
      <Route path="/products" component={ProductFeature} /> 

    </Switch>
    </div>
  );
}

export default App;
