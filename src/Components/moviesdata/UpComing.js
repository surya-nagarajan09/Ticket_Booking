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
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';


/** definig style for material ui */
const useStyles = makeStyles({
  root: {
    maxWidth:300,
    backgroundColor:"#FFDB58",
    margin:"20px"
  },
  media: {
    height: 200,
    border: "20px"
  },
});
const frameStyle = makeStyles({
  root: {
    position:"realtive",
    width:"100%",
    overflow:"hidden",
  },
  frameres:{
    width:"100%",
    height:"100%",
  }
});
const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    },
 
}));

/** material ui */
const Upcoming=()=> {
  const classes = useStyles();
  const frames=frameStyle();
  const grid=gridStyles();
  const[movie,setMovie]=useState([]);
  const[frame,setFrame]=useState("");
  const[loading,setLoading]=useState(false);
  useEffect(()=>{
      const fetch= async()=>{
        setLoading(true)
       const req=await axios.get("https://moviebackends.herokuapp.com/upcoming");
       const data=req.data;
       setMovie(data)
       setLoading(false)
      }
      fetch()
  },[])

  /** multiple return condition */


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
            <Card className={frames.root}>
            <CardActionArea>
            <CardMedia >
          <iframe className={frames.frameres} width="1500" height="1500" src={`https://www.youtube.com/embed/${frame}`} title="dsf" allowfullscreen></iframe>
          </CardMedia>
          </CardActionArea>
            </Card>
          
          </Grid>
          <Grid item xs={12} >
          <div style={{display: 'flex',flexWrap:"wrap",margin:"5px",border:"5px",padding:"5px"}}>{movie.map((each)=>(
              <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media} component="img" alt={each.name} height="150"image={each.img} />
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
                    <Typography variant="body2" color="textSecondary" component="p">
                   About: {each.synopsis}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button color="secondary" variant="contained" onClick={()=>setFrame(each.link)}><PlayCircleOutlineIcon/>Play </Button>
            </Card>  ))}  
      </div>
      </Grid>
     </Grid>
  </div>
   
  );
}
}

export default Upcoming;
