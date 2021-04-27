import React,{useState,useEffect} from 'react';
import axios from "axios"

/** material ui  */
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardActions from '@material-ui/core/CardActions';

/** definig style for material ui */
const useStyles = makeStyles({
  root: {
    maxWidth:300,
    backgroundColor:"#FFFAFA",
    margin:"20px"
  },
});
const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
 
}));
const buttonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

/** main function */
const Current=()=> {
  const classes = useStyles();
  const button=buttonStyles();
 
  const grid=gridStyles();
  const[movie,setMovie]=useState([]);
  const[filter,setFilter]=useState("current");

  const[loading,setLoading]=useState(false);

  /** fetching  */
  useEffect(()=>{
      const fetch= async()=>{
        setLoading(true)
       const req=await axios.get(`https://moviebackends.herokuapp.com/${filter}`);
       const data=req.data;
       setMovie(data)
       setLoading(false)
      }
      fetch()
  },[filter])

  /** filter */

  const all=()=>{
    setFilter("current")
  }
  const tamil=()=>{
    setFilter("tamil")
  }

  const english=()=>{
    setFilter("english")
  }

  const malayalam=()=>{
    setFilter("malayalam")
  }
  const hindi=()=>{
    setFilter("hindi")
  }
  /** booking */
   const book=(item)=>{
     const movie=item;
     localStorage.clear();
     window.localStorage.setItem("book",JSON.stringify(movie));
     console.log(movie)
    }
   
  /** returning progress if loading */
  if(loading){
       return(
         <div> 
          <LinearProgress/>    
         </div>
       )
    
  }else{

/** returning after loading  */
  return (
    <div className={grid.root}>
          <Grid container spacing={0}>
          <Grid item xs={12}>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",padding:"5px"}}>
            <div className={button.root}>
            <ButtonGroup variant="text" color="secondary" aria-label="text primary button group">
            <Button  variant="outlined"  color="secondary" onClick={all}>All</Button>
            <Button  variant="outlined"  color="secondary" onClick={tamil}>Tamil</Button>
            <Button  variant="outlined"  color="secondary" onClick={english}>English</Button>
            <Button variant="outlined"  color="secondary"  onClick={malayalam}>Malayalam</Button>
            <Button  variant="outlined"  color="secondary"  onClick={hindi}>Hindi</Button>
            </ButtonGroup>
             </div>
         
            </div>
          </Grid>
          <Grid item xs={12} >
          <div style={{display: 'flex',flexWrap:"wrap",margin:"5px",border:"5px",padding:"5px"}}>{movie.map((each)=>(
              <Card key={each.id} className={classes.root}>
              <CardActionArea>
                <CardMedia component="img" alt={each.name} height="150"image={each.img} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                   {each.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                  Language: {each.language}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                  Director: {each.director}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                  Music Director: {each.musicdirector}
                  </Typography>    
                   <Typography gutterBottom variant="h6" component="h6">
                  Actors: {each.actors}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
              <Button color="primary"  href="/view" variant="contained" onClick={()=>book(each)}>Book</Button>
              </CardActions>
              </Card>  ))}  
      </div>
      </Grid>
     </Grid>
  </div>
   
  );
}
}

export default Current;
