import React,{useState} from "react";
import Upcoming from "../Components/moviesdata/UpComing"
import Current from "../Components/moviesdata/Current"
import Button from "@material-ui/core/Button"
import ButtonGroup from '@material-ui/core/ButtonGroup';


const Movie=()=>{
    const[component,setComponent]=useState(<Current/>)

    return(
        <div>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",padding:"5px"}}>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button  variant="contained" color="primary" onClick={()=>setComponent(<Current/>)}>Now Showing</Button>
            <Button  variant="contained" color="secondary" onClick={()=>setComponent(<Upcoming/>)}>upComing</Button>
            </ButtonGroup>
            </div>
           
            <div>
                {component}
            </div>
        </div>
    )

}
export default Movie;