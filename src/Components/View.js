    import React,{useState,useEffect} from 'react';
    import { makeStyles } from '@material-ui/core/styles';
    import Card from '@material-ui/core/Card';
    import CardContent from '@material-ui/core/CardContent';
    import CardMedia from '@material-ui/core/CardMedia';
    import 'date-fns';
    import DateFnsUtils from '@date-io/date-fns';
    import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
    import Button from '@material-ui/core/Button';
    import Grid from '@material-ui/core/Grid';
    import CardActionArea from '@material-ui/core/CardActionArea';
 
  


    import Typography from '@material-ui/core/Typography';
    const gridStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));


      

    const useStyles = makeStyles((theme) => ({
    root: {
    maxWidth: "full",
  },
  media: {
    height: 250,
  },

    }));

    export default function MediaControlCard() {
    const classes = useStyles();
    const grid=gridStyles();
    const n=new Date();
    const current=`${n.getMonth()+1}/${n.getDate()}/${n.getFullYear()}`;



    const [book,setBook]=useState([]);
    const[date,setDate]=useState(current);
    const [msg,setMsg]=useState("");
    const[time,setTime]=useState("not selected");
    const[button,setButton]=useState(false)
   

    const changeDate=(date)=>{
        const refrence=new Date(date);
        let d1=refrence.getDate();
        let d2=n.getDate();
        
        if((refrence.getMonth+1)===(current.getMonth+1)){
            setMsg("select with in this month")
         }else if(d1<d2){
             setMsg("can't be selected")
        }else{
            setDate(refrence)
            setButton(true)
            setMsg("")
        }
    
    };  
    useEffect(()=>{
        const result=window.localStorage.getItem("book");
        const val=JSON.parse(result);
        setBook(val);
    },[])

    //

    const submit=()=>{
        if(time==="not selected"){
            setMsg("please select time")
        }else{
            window.localStorage.setItem("time",JSON.stringify(time))
            window.localStorage.setItem("date",JSON.stringify(date))    
  }
         }

    return (
        <div className={grid.root}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <div>
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={book.img} title={book.name}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"> Name:{book.name}</Typography>
          <Typography gutterBottom variant="h5" component="h2">Language: {book.language}</Typography>
          <Typography gutterBottom variant="h5" component="h2"> Date:{book.date}</Typography>
          <Typography gutterBottom variant="h5" component="h2">Cast: {book.actors}</Typography>
          <Typography gutterBottom variant="h5" component="h2">Director: {book.director}</Typography>
          <Typography gutterBottom variant="h5" component="h2">MusicDirector: {book.musicdirector}</Typography>    
          <Typography gutterBottom variant="body2" component="h2">MusicDirector: {book.synopsis}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
      </div>
        </Grid>


        <Grid item xs={12} sm={6}>
        <div >
        <Typography variant="h4">Select Date of Show</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="select Show Date" format="MM/dd/yyyy" onChange={changeDate} value={date} KeyboardButtonProps={{'aria-label': 'change date', }} />
        </MuiPickersUtilsProvider>
        <Typography variant="h4">{msg}</Typography>
        
        </div>
        <hr></hr>
        <div>
            <Typography variant="h4">Select Time</Typography>
        </div>
        <div style={{display: 'flex',flexWrap:"wrap",padding:"5px",marginLeft:"2px"}}>
           <Button variant="outlined" color="primary"onClick={()=>setTime("10.30AM")} >10AM</Button>
           <Button variant="outlined" color="primary"onClick={()=>setTime("2.30 PM")} >2.30PM</Button>
           <Button variant="outlined" color="primary"onClick={()=>setTime("6.30 PM")} >6.30PM</Button>
           <Button variant="outlined" color="primary"onClick={()=>setTime("10 PM")} >10PM</Button>
        </div > 
          <Typography>{`Time:${time}`}</Typography>
          <p></p>
          <Button  color="secondary" variant="contained" onClick={submit} href="/booking" disabled={button===false}>Next</Button>

       
        </Grid>
       

       
        </Grid>
        </div>
      
    );
    }
