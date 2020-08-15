import React from 'react'
import { Dropdown,Input, Button, Icon, Menu, Select } from 'semantic-ui-react'
import { useState } from 'react'
import Display from '../components/Display'

const DropdownExampleClearable = (props) => {

const [val,setVal]=useState('def')
const [brand,setBrand]=useState('')

    return(
    <center>
      <Input required name='brand' value={brand} placeholder='BRAND-ASSET' onChange={e=>setBrand(e.target.value)}>
        <select required placeholder='Choose one' value={val} onChange={e => setVal(e.target.value)}>
          <option default value='def' >Select a Event...</option>
          {
            props.totEve.map((event,index) =>(
                  <option key={event.eve} value={index}>
                      {event.eve}
                  </option>
            ))
        }
      </select>
      <input required autoFocus/>
      <Button type='submit' icon='add' color='teal' 
        onClick={
        val!='def' && brand!=''?
        async () =>{
        let index=parseInt(val,10)+1
        const tot_brands={brand,index}
        const response = await fetch("/add_brand",{
            method: "POST",
            headers:{
             "Content-Type" : "application/json"
            },
            body : JSON.stringify(tot_brands)
           }
        );
        if(response.ok){
          console.log("brand responded!")
          props.addBrand(val,brand)
          setBrand('')
          console.log(index)
         }
       }:""
      }
    />
  </Input>
  <br />
  <Display value={val} showEvent={props.showEvent} totEve={props.totEve} copy={props.copy} removeB={props.removeBrand}/>
  </center>
  )
}

export default DropdownExampleClearable