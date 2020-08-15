import React from 'react'
import {Label, Icon, Grid, Segment, Button, List,Input} from 'semantic-ui-react'
import {useState} from 'react'

const Display = (props) =>{

    const [val1,setVal]=useState()
    const copybrand=()=>{
        props.copy(props.value,val1)
        setVal({undefined})
         }
    return(
        <center><br />
            {
            props.value!=='def'?
                <Segment container raised compact justify='center'>  
                <Label color='red' ribbon>
                    EVENT NAME
                </Label>
                 <b><u>{props.totEve[props.value].eve}</u></b> 
                 <br /><br />
                <Label color='teal' justify='center'>DATE</Label><br />
                <span><b>{props.totEve[props.value]['date']}</b></span><br /><br />
                <Label color='olive' justify='center'>BRANDS</Label><br />
                {props.totEve[props.value]["brand"].length===0?<div>No Brands Yet</div>:
                <span>
               {props.totEve[props.value]["brand"].map((brand,ind)=>
                    <span><List as='ul' verticalAlign>
                    <List.Item as='li'>{brand}
                    <Icon name='remove circle' 
                    onClick={
                        async () =>{
                            let index=parseInt(props.value,10)+1
                            const remove={brand,index};
                            const response = await fetch("/delete_brand",{
                                method:"POST",
                                headers:{
                                    "Content-Type" : "application/json"
                                },
                                body : JSON.stringify(remove)
                            });
                            if(response.ok){
                                console.log("deleted")
                                props.removeB(props.value,ind)
                                console.log(props.value,val1)
                            }
                            else
                                console.log(brand,index)
                            
                        }
                    }/></List.Item>
                    </List>
                    </span>
                )}
            </span>} 
            <br />
            {
            props.totEve.length>1?
           <Input size='mini'>
           <select size='mini' required placeholder='Choose one' value={val1} onChange={e => setVal(e.target.value)}>
        <option default value={undefined}>Copy another Event's brands...</option>
        {   console.log(props.value)}{
            props.totEve.map((event,index) =>(
                  props.value!=index?
                  <option key={index} value={index}>
                      {event.eve}
                  </option>:''
            ))
        }
      </select>
  <Button size='mini' type='submit' icon='add' color='green' onClick={
     
        val1!=undefined?
        async () =>{
            let event2=parseInt(val1,10)+1
            let event1=parseInt(props.value,10)+1
        const tot_brands={event1,event2}
        const response = await fetch("/copy",{
            method: "POST",
            headers:{
             "Content-Type" : "application/json"
            },
            body : JSON.stringify(tot_brands)
           }
        );
        if(response.ok){
          console.log("brand responded!")
          copybrand(props.value,val1)
         }
         else{
             console.log("error")
             console.log(props.value,val1)
         }
       }:""
      }/>
  </Input>:''
        }
           </Segment>
                :''
            }
        </center>
    )
}

export default Display