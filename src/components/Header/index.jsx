import { Badge, Box, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Login from '../../features/Auth/components/Login';
import Register from '../../features/Auth/components/Register';
import { logout } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/Seletors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
       textDecoration : 'none',
  },
  closeButton : {
    position : 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  }
}));

const MODE = {
  LOGIN : 'login'  , 
  REGISTER : 'register' 
}

export default function Header() {
  const dispatch = useDispatch();
    const loggedInUser =  useSelector(state => state.user.current);
    const isLoggedIn = !!loggedInUser.id;
    const [open, setOpen] = useState(false);
    const [mode , setMode] = useState(MODE.LOGIN);
    const [anchorEl , setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget) ;
  }
  const handleCloseMenu = () => {
    setAnchorEl(null) ;
  }
  const classes = useStyles();

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  }

  const cartItemsCount = useSelector(cartItemsCountSelector);

  const history = useHistory();
  const handleCartClick = () => {
    history.push('/cart')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <CodeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to='/' className={classes.link}>Shop</Link>
          </Typography>
          
          
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          )}

          <IconButton aria-label='show ' color='inherit' onClick={handleCartClick}>
            <Badge badgeContent={cartItemsCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>


          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}

          
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      
        getContentAnchorEl={null}
>
  <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
  <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
</Menu>

      <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      disableBackdropClic
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title">
       
       <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
       </IconButton>
        
        <DialogContent>

          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />
            
             <Box textAlign='center'>
                <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                    Already have an account . Login here
                </Button>
             </Box>
             </>
          )}
           {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />
            
             <Box textAlign='center'>
                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                    Dont have an account . Register here
                </Button>
             </Box>
             </>
          )}
            

        </DialogContent>

        
      </Dialog>
    </div>
  );
}
