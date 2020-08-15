import React,{useState,useEffect} from 'react'
import Event from './Event'
import Brand from './brand'
import { Divider } from 'semantic-ui-react'
import axios from 'axios';

import Display from '../components/Display'

const EventPage =() =>{

    const [final,setFin]=useState([])
    const [totalEvents,setTE] =useState([]);
    const [dat,setdat]=useState([{}])   
 useEffect( 
    ()=>{
        fetch('/events').then(
          response => response.json()
        ).then(data=>setTE(data))
      },[]
 );
 /*async () => {
    const result = await axios(
      '/events',
    );
 
    setTE(result);
  }, []*/
 /**/
   console.log(totalEvents)
    const addEvent = (event,value) =>{
        if(event!==''){
        let tot={eve:event,date:value,brand:[]}
        let temp=[...totalEvents,tot]
        setTE(temp);
        }
    }
    const brand = (val, brand) =>{
       let temp=[...totalEvents]
       if(val!==0 && brand!=='')
        temp[val]["brand"].push(brand)
        setTE(temp)
    }
    const closeFun = (index,ind) =>{
        let Eve=[...totalEvents]
        Eve[index]["brand"].splice(ind,1);
        setTE(Eve)
    }

    const copy =(val,val1)=>{
      
        let temp=[...totalEvents]
        if(val1!= {undefined} ){
        for(let i=0;i<temp[val1]["brand"].length;i++)
        temp[val]["brand"].push(temp[val1]["brand"][i])
        setTE(temp)
         console.log(temp[val1]["brand"])
         console.log("brand")
        }
    }

    return (
        <span>
        <Event add={addEvent} totEve={totalEvents}/><br />
        <Divider horizontal> AND </Divider>
        <Brand showEvent={final} copy={copy} totEve={totalEvents} addBrand={brand} removeBrand={closeFun}/>
        </span>
    )
}

export default EventPage
