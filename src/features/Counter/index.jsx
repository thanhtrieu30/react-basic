import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



Counter.propTypes = {


};


const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });

function Counter(props) {
    

    const classes = useStyles();
    const count =   useSelector  (state => state.count);
    const dispatch = useDispatch();

    const handleIncreaseClick = () => {
        const action = increase();
        dispatch(action);

    }
    const handleDecrease = () => {
        const action = decrease();
        dispatch(action);
    }
 
    

    return (    
        <div>Couter: {count }
        <div>
        <Button className={classes.root} onClick={handleIncreaseClick}>increase</Button>     
        <Button className={classes.root} onClick={handleDecrease}>decrease</Button>

        </div>
        
    
        </div> 
    )
}

export default Counter;