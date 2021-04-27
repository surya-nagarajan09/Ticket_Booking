import React from 'react';
/** importing from material ui */
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';


/** defining style */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:"red"
  },
}));

const typoStyle = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginLeft: theme.spacing(10),
      },
    },
  }));


 /**main function */
  const Nav=()=> {
  const classes = useStyles();
  const typo=typoStyle();

   const logout=()=> {  
     sessionStorage.clear();
      }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Typography className={typo.root}>
           <Link href="/" color="inherit">Home</Link>
           <Link href="/Movies" color="inherit">Movies</Link>
           <Link href="/Login" color="inherit">Login/Signup</Link>
           <Button onClick={logout} href="/">Logout</Button>
      </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
  }
export default Nav;


