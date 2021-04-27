import React,{useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
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

const SignUp=()=> {
  const classes = gridStyle();
  const text=textStyles();
  const button=buttonStyles();
  const[signUpMessage,setSignUpMessage]=useState("");
  const[signUp,setSignUp]=useState({email:"",firstName:"",lastName:"",password:""});
  const urlsign="https://authenticate-commerce.herokuapp.com/signup";

  const handleSignUp=(e)=>{
    e.preventDefault();
    const{email,firstName,lastName,password}=signUp;
    setSignUpMessage(<CircularProgress color="secondary" />);
    if((email!=="")&&(password!=="")&&(firstName!=="")&&(lastName!=="")&&(password.length>=7)){
     axios.post(urlsign,{
      email:email,
      firstName:firstName,
      lastName:lastName,
      password:password
    }).then((res)=>{
      if(res.status===200){
        setSignUpMessage(`sucessfully signed ✓`);
      }
    },(err)=>{
      if(err){
        setSignUpMessage("User already exist ❌")
      }
    })
  }else{
    setSignUpMessage(`please fill all fileds `)
  }

    }
  
  

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography component="h4" variant="h4">Signup</Typography>
           <form className={text.root}  autoComplete="off" onSubmit={handleSignUp}>
                <TextField id="standard-basic" label="E-mail" type="email" onChange={(e)=>setSignUp({...signUp,email:e.target.value})}/>
                <TextField id="standard-basic" label="First Name" type="text" onChange={(e)=>setSignUp({...signUp,firstName:e.target.value})} />
                <TextField id="standard-basic" label="Last Name" type="text" onChange={(e)=>setSignUp({...signUp,lastName:e.target.value})}/>
                <TextField id="standard-basic" label="Password"  type="password" onChange={(e)=>setSignUp({...signUp,password:e.target.value})}/>
                <div className={button.root}>
                 <Button variant="contained" type="submit" color="primary">Signup</Button>
                 <Typography component="h4" variant="h4">{signUpMessage}</Typography>
                </div>
           </form>
          </Grid>
        <Grid item xs>
       </Grid>
      </Grid>
    </div>
  );

}


export default SignUp;