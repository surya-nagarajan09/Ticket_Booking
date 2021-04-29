import React,{useState} from 'react';
import axios from "axios"


//style imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

// gird style

const gridStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

// text filed style
const textStyles= makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(3),
        width: '45ch',
        diplay:"block",
        
      },
    },
  }));
  // button textStyles
  const buttonStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        align:"center"
      },
    },
  }));
  

  // main function

const Login=()=> {
  const classes = gridStyle();
  const text=textStyles();
  const button=buttonStyles();
  const[login,setLogin]=useState([{eamil:"",password:"",}]);
  const[loginMesage,setLoginMessage]=useState("");
  

  const loginHandle=(e)=>{
    e.preventDefault();
    setLoginMessage(<CircularProgress color="secondary" />)
    const logindata=login;
    if((logindata.email !=="")&&(logindata.password!=="")){
      axios.post("https://authenticate-commerce.herokuapp.com/login",logindata)
     .then((res)=>{
       if(res.status===200)
       {
         sessionStorage.setItem("logged",true)
         setLoginMessage("login in successfull !!!") 
        }
       
     },(err)=>{
       setLoginMessage("login failure")
     })

    }else{
      setLoginMessage("please fill all fileds")
    }
     

  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography component="h4" variant="h4">Login</Typography>
           <form className={text.root} autoComplete="off" onSubmit={loginHandle}>
                <TextField id="standard-basic" type="email"label="E-mail" onChange={(e)=>setLogin({...login,email:e.target.value})} />
                <TextField id="standard-basic"  type="password" label="Password"  onChange={(e)=>setLogin({...login,password:e.target.value})} />
                <div className={button.root}>
                 <Button variant="contained" type="submit"  color="primary">Login</Button>
                </div>
           </form>
           
             <div className={classes.details}>
               <CardContent className={classes.content}>
                 <Typography component="h6" variant="h6">
                   Dont have accont ?  <Link href="/signup">signup <Typography component="h6" variant="h6">{loginMesage}</Typography></Link> 
                  
                   </Typography>
                   
                </CardContent>
              </div>
             
          </Grid>
          
        <Grid item xs>
       </Grid>
      </Grid>
    </div>
  );
  }

  

export default Login;